import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  Wine,
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  Truck,
  ShoppingCart,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { toast, Toaster } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { Producto, Movimiento, Proveedor, Pedido, LineaPedido } from '@/lib/stock-types';
import {
  initSeedData,
  getProductos,
  saveProducto,
  deleteProducto,
  getMovimientos,
  registrarMovimiento,
  getProveedores,
  saveProveedor,
  getPedidos,
  savePedido,
} from '@/lib/stock-store';

export const Route = createFileRoute('/stock')({
  component: StockApp,
});

type View = 'dashboard' | 'productos' | 'movimientos' | 'proveedores' | 'pedidos' | 'alertas';

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatMoney(amount: number): string {
  return `€${amount.toFixed(2)}`;
}

function stockStatus(p: Producto): { label: string; variant: 'destructive' | 'secondary' | 'default' | 'outline'; color: string } {
  if (p.stock_actual === 0) return { label: 'Crítico', variant: 'destructive', color: 'text-red-600' };
  if (p.stock_actual < p.stock_minimo) return { label: 'Bajo', variant: 'secondary', color: 'text-amber-600' };
  if (p.stock_actual > p.stock_maximo) return { label: 'Exceso', variant: 'outline', color: 'text-blue-600' };
  return { label: 'OK', variant: 'default', color: 'text-green-600' };
}

function MovBadge({ tipo }: { tipo: Movimiento['tipo'] }) {
  if (tipo === 'entrada') return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Entrada</Badge>;
  if (tipo === 'salida') return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Salida</Badge>;
  return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Ajuste</Badge>;
}

function PedidoBadge({ estado }: { estado: Pedido['estado'] }) {
  const map: Record<Pedido['estado'], { label: string; cls: string }> = {
    borrador: { label: 'Borrador', cls: 'bg-gray-100 text-gray-700 hover:bg-gray-100' },
    enviado: { label: 'Enviado', cls: 'bg-blue-100 text-blue-700 hover:bg-blue-100' },
    recibido_parcial: { label: 'Rec. Parcial', cls: 'bg-amber-100 text-amber-700 hover:bg-amber-100' },
    recibido: { label: 'Recibido', cls: 'bg-green-100 text-green-700 hover:bg-green-100' },
    cancelado: { label: 'Cancelado', cls: 'bg-red-100 text-red-700 hover:bg-red-100' },
  };
  const { label, cls } = map[estado];
  return <Badge className={cls}>{label}</Badge>;
}

// ── Schemas ──────────────────────────────────────────────────────────────────

const productoSchema = z.object({
  sku: z.string().min(1, 'SKU requerido'),
  nombre: z.string().min(1, 'Nombre requerido'),
  categoria: z.string().min(1, 'Categoría requerida'),
  descripcion: z.string().optional(),
  stock_actual: z.coerce.number().min(0),
  stock_minimo: z.coerce.number().min(0),
  stock_maximo: z.coerce.number().min(1),
  unidad: z.string().min(1, 'Unidad requerida'),
  precio_compra: z.coerce.number().min(0),
  precio_venta: z.coerce.number().min(0),
  proveedor_id: z.string().min(1, 'Proveedor requerido'),
  ubicacion: z.string().min(1, 'Ubicación requerida'),
  activo: z.boolean(),
});
type ProductoForm = z.infer<typeof productoSchema>;

const movimientoSchema = z.object({
  producto_id: z.string().min(1, 'Producto requerido'),
  tipo: z.enum(['entrada', 'salida', 'ajuste']),
  cantidad: z.coerce.number().min(1, 'Cantidad mínima 1'),
  referencia: z.string().optional(),
  notas: z.string().optional(),
  usuario: z.string().min(1, 'Usuario requerido'),
});
type MovimientoForm = z.infer<typeof movimientoSchema>;

const proveedorSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  contacto: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  categorias: z.string().min(1, 'Al menos una categoría'),
  activo: z.boolean(),
});
type ProveedorForm = z.infer<typeof proveedorSchema>;

const CATEGORIAS = ['Vinos', 'Licores', 'Espirituosos', 'Cervezas', 'Cavas'];
const UNIDADES = ['botella', 'caja', 'litro', 'unidad'];

// ── Main component ────────────────────────────────────────────────────────────

export default function StockApp() {
  const [view, setView] = useState<View>('dashboard');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  function refresh() {
    setProductos(getProductos());
    setMovimientos(getMovimientos());
    setProveedores(getProveedores());
    setPedidos(getPedidos());
  }

  useEffect(() => {
    initSeedData();
    refresh();
  }, []);

  const alertCount = productos.filter(
    (p) => p.activo && p.stock_actual < p.stock_minimo,
  ).length;

  const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'productos', label: 'Productos', icon: <Package size={18} /> },
    { id: 'movimientos', label: 'Movimientos', icon: <ArrowLeftRight size={18} /> },
    { id: 'proveedores', label: 'Proveedores', icon: <Truck size={18} /> },
    { id: 'pedidos', label: 'Pedidos', icon: <ShoppingCart size={18} /> },
    { id: 'alertas', label: 'Alertas', icon: <AlertTriangle size={18} /> },
  ];

  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-primary">
            <Wine size={24} />
            <div>
              <p className="font-bold text-sm leading-tight">Licors Moyà</p>
              <p className="text-xs text-muted-foreground">Control de Stock</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                view === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === 'alertas' && alertCount > 0 && (
                <Badge variant="destructive" className="text-xs px-1.5 py-0 h-4">
                  {alertCount}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-muted-foreground">{todayStr}</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {view === 'dashboard' && (
          <DashboardView
            productos={productos}
            movimientos={movimientos}
            proveedores={proveedores}
          />
        )}
        {view === 'productos' && (
          <ProductosView
            productos={productos}
            proveedores={proveedores}
            onRefresh={refresh}
          />
        )}
        {view === 'movimientos' && (
          <MovimientosView
            movimientos={movimientos}
            productos={productos}
            onRefresh={refresh}
          />
        )}
        {view === 'proveedores' && (
          <ProveedoresView proveedores={proveedores} onRefresh={refresh} />
        )}
        {view === 'pedidos' && (
          <PedidosView
            pedidos={pedidos}
            productos={productos}
            proveedores={proveedores}
            onRefresh={refresh}
          />
        )}
        {view === 'alertas' && (
          <AlertasView
            productos={productos}
            proveedores={proveedores}
            onNavigatePedidos={() => setView('pedidos')}
          />
        )}
      </main>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function DashboardView({
  productos,
  movimientos,
  proveedores,
}: {
  productos: Producto[];
  movimientos: Movimiento[];
  proveedores: Proveedor[];
}) {
  const valorStock = productos.reduce(
    (acc, p) => acc + p.stock_actual * p.precio_compra,
    0,
  );
  const alertas = productos.filter(
    (p) => p.activo && p.stock_actual < p.stock_minimo,
  ).length;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const movHoy = movimientos.filter((m) => new Date(m.fecha) >= hoy).length;

  const categoriaData = CATEGORIAS.map((cat) => {
    const total = productos
      .filter((p) => p.categoria === cat)
      .reduce((acc, p) => acc + p.stock_actual, 0);
    return { name: cat, stock: total };
  });

  const ultimosMov = [...movimientos]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 10);

  const criticos = productos.filter(
    (p) => p.activo && p.stock_actual < p.stock_minimo,
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Productos"
          value={String(productos.filter((p) => p.activo).length)}
          icon={<Package size={20} className="text-blue-500" />}
          sub="productos activos"
        />
        <StatCard
          label="Valor de Stock"
          value={formatMoney(valorStock)}
          icon={<BarChart3 size={20} className="text-green-500" />}
          sub="coste total almacén"
        />
        <StatCard
          label="Alertas Activas"
          value={String(alertas)}
          icon={<AlertTriangle size={20} className="text-amber-500" />}
          sub="productos bajo mínimo"
          highlight={alertas > 0}
        />
        <StatCard
          label="Movimientos Hoy"
          value={String(movHoy)}
          icon={<ArrowLeftRight size={20} className="text-purple-500" />}
          sub="entradas y salidas"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="text-sm font-semibold mb-4">Stock por Categoría</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoriaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="stock" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Últimos movimientos */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="text-sm font-semibold mb-3">Últimos Movimientos</h2>
          <div className="space-y-2">
            {ultimosMov.map((m) => {
              const prod = productos.find((p) => p.id === m.producto_id);
              return (
                <div key={m.id} className="flex items-center gap-2 text-sm">
                  {m.tipo === 'entrada' ? (
                    <TrendingUp size={14} className="text-green-500 flex-shrink-0" />
                  ) : m.tipo === 'salida' ? (
                    <TrendingDown size={14} className="text-red-500 flex-shrink-0" />
                  ) : (
                    <ArrowLeftRight size={14} className="text-blue-500 flex-shrink-0" />
                  )}
                  <span className="flex-1 truncate text-muted-foreground">
                    {prod?.nombre ?? m.producto_id}
                  </span>
                  <span className="font-medium">{m.cantidad > 0 ? `+${m.cantidad}` : m.cantidad}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(m.fecha)}</span>
                </div>
              );
            })}
            {ultimosMov.length === 0 && (
              <p className="text-sm text-muted-foreground">Sin movimientos</p>
            )}
          </div>
        </div>
      </div>

      {/* Productos críticos */}
      {criticos.length > 0 && (
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <h2 className="text-sm font-semibold text-red-600 flex items-center gap-2">
              <AlertTriangle size={16} /> Productos Críticos
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Stock Actual</TableHead>
                <TableHead className="text-right">Stock Mínimo</TableHead>
                <TableHead>Proveedor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criticos.map((p) => {
                const prov = proveedores.find((v) => v.id === p.proveedor_id);
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                    <TableCell>{p.nombre}</TableCell>
                    <TableCell>{p.categoria}</TableCell>
                    <TableCell className="text-right font-semibold text-red-600">
                      {p.stock_actual}
                    </TableCell>
                    <TableCell className="text-right">{p.stock_minimo}</TableCell>
                    <TableCell>{prov?.nombre ?? '-'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-lg border p-4 ${highlight ? 'border-amber-300' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}

// ── Productos ─────────────────────────────────────────────────────────────────

function ProductosView({
  productos,
  proveedores,
  onRefresh,
}: {
  productos: Producto[];
  proveedores: Proveedor[];
  onRefresh: () => void;
}) {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [editTarget, setEditTarget] = useState<Producto | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Producto | null>(null);

  const filtered = productos.filter((p) => {
    const matchSearch =
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || p.categoria === catFilter;
    return matchSearch && matchCat;
  });

  function openCreate() {
    setEditTarget(null);
    setShowForm(true);
  }

  function openEdit(p: Producto) {
    setEditTarget(p);
    setShowForm(true);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    deleteProducto(deleteTarget.id);
    onRefresh();
    toast.success(`Producto "${deleteTarget.nombre}" eliminado`);
    setDeleteTarget(null);
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Button onClick={openCreate}>
          <Plus size={16} className="mr-1" /> Nuevo Producto
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {CATEGORIAS.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Mín</TableHead>
              <TableHead className="text-right">Máx</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">P. Compra</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => {
              const status = stockStatus(p);
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                  <TableCell className="font-medium">{p.nombre}</TableCell>
                  <TableCell>{p.categoria}</TableCell>
                  <TableCell className={`text-right font-semibold ${status.color}`}>
                    {p.stock_actual}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{p.stock_minimo}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{p.stock_maximo}</TableCell>
                  <TableCell>
                    <Badge
                      variant={status.variant}
                      className={
                        status.label === 'Bajo'
                          ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                          : status.label === 'Exceso'
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                          : status.label === 'OK'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : ''
                      }
                    >
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatMoney(p.precio_compra)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setDeleteTarget(p)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                  No se encontraron productos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ProductoDialog
        open={showForm}
        onClose={() => setShowForm(false)}
        producto={editTarget}
        proveedores={proveedores}
        onSave={(data) => {
          const now = new Date().toISOString();
          const producto: Producto = editTarget
            ? { ...editTarget, ...data, actualizado_en: now }
            : {
                id: crypto.randomUUID(),
                ...data,
                descripcion: data.descripcion ?? '',
                creado_en: now,
                actualizado_en: now,
              };
          saveProducto(producto);
          onRefresh();
          toast.success(editTarget ? 'Producto actualizado' : 'Producto creado');
          setShowForm(false);
        }}
      />

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar producto</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            ¿Seguro que quieres eliminar <strong>{deleteTarget?.nombre}</strong>? Esta acción no
            se puede deshacer.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductoDialog({
  open,
  onClose,
  producto,
  proveedores,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  producto: Producto | null;
  proveedores: Proveedor[];
  onSave: (data: ProductoForm) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductoForm>({
    resolver: zodResolver(productoSchema),
    defaultValues: { activo: true, unidad: 'botella', categoria: 'Vinos' },
  });

  useEffect(() => {
    if (producto) {
      reset({
        sku: producto.sku,
        nombre: producto.nombre,
        categoria: producto.categoria,
        descripcion: producto.descripcion ?? '',
        stock_actual: producto.stock_actual,
        stock_minimo: producto.stock_minimo,
        stock_maximo: producto.stock_maximo,
        unidad: producto.unidad,
        precio_compra: producto.precio_compra,
        precio_venta: producto.precio_venta,
        proveedor_id: producto.proveedor_id,
        ubicacion: producto.ubicacion,
        activo: producto.activo,
      });
    } else {
      reset({ activo: true, unidad: 'botella', categoria: 'Vinos' });
    }
  }, [producto, open, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{producto ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>SKU</Label>
              <Input {...register('sku')} placeholder="VIN-TGV-75" />
              {errors.sku && <p className="text-xs text-red-500">{errors.sku.message}</p>}
            </div>
            <div className="space-y-1">
              <Label>Nombre</Label>
              <Input {...register('nombre')} placeholder="Nombre del producto" />
              {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Categoría</Label>
              <Select
                value={watch('categoria')}
                onValueChange={(v) => setValue('categoria', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoria && <p className="text-xs text-red-500">{errors.categoria.message}</p>}
            </div>
            <div className="space-y-1">
              <Label>Unidad</Label>
              <Select
                value={watch('unidad')}
                onValueChange={(v) => setValue('unidad', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNIDADES.map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label>Descripción</Label>
            <Input {...register('descripcion')} placeholder="Descripción opcional" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>Stock Actual</Label>
              <Input type="number" {...register('stock_actual')} />
              {errors.stock_actual && <p className="text-xs text-red-500">{errors.stock_actual.message}</p>}
            </div>
            <div className="space-y-1">
              <Label>Stock Mínimo</Label>
              <Input type="number" {...register('stock_minimo')} />
            </div>
            <div className="space-y-1">
              <Label>Stock Máximo</Label>
              <Input type="number" {...register('stock_maximo')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Precio Compra (€)</Label>
              <Input type="number" step="0.01" {...register('precio_compra')} />
            </div>
            <div className="space-y-1">
              <Label>Precio Venta (€)</Label>
              <Input type="number" step="0.01" {...register('precio_venta')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Proveedor</Label>
              <Select
                value={watch('proveedor_id')}
                onValueChange={(v) => setValue('proveedor_id', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {proveedores.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.proveedor_id && <p className="text-xs text-red-500">{errors.proveedor_id.message}</p>}
            </div>
            <div className="space-y-1">
              <Label>Ubicación</Label>
              <Input {...register('ubicacion')} placeholder="A-01" />
              {errors.ubicacion && <p className="text-xs text-red-500">{errors.ubicacion.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activo"
              {...register('activo')}
              className="h-4 w-4"
            />
            <Label htmlFor="activo">Producto activo</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{producto ? 'Guardar cambios' : 'Crear producto'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Movimientos ───────────────────────────────────────────────────────────────

function MovimientosView({
  movimientos,
  productos,
  onRefresh,
}: {
  movimientos: Movimiento[];
  productos: Producto[];
  onRefresh: () => void;
}) {
  const [tipoFilter, setTipoFilter] = useState<string>('all');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filtered = movimientos
    .filter((m) => {
      const matchTipo = tipoFilter === 'all' || m.tipo === tipoFilter;
      const fecha = new Date(m.fecha);
      const matchDesde = !desde || fecha >= new Date(desde);
      const matchHasta = !hasta || fecha <= new Date(hasta + 'T23:59:59');
      return matchTipo && matchDesde && matchHasta;
    })
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MovimientoForm>({
    resolver: zodResolver(movimientoSchema),
    defaultValues: { tipo: 'entrada', usuario: 'Carlos Moyà' },
  });

  function onSubmit(data: MovimientoForm) {
    const prod = productos.find((p) => p.id === data.producto_id);
    if (!prod) return;

    let stock_posterior: number;
    if (data.tipo === 'entrada') stock_posterior = prod.stock_actual + data.cantidad;
    else if (data.tipo === 'salida')
      stock_posterior = Math.max(0, prod.stock_actual - data.cantidad);
    else stock_posterior = data.cantidad;

    registrarMovimiento({
      producto_id: data.producto_id,
      tipo: data.tipo,
      cantidad: data.cantidad,
      stock_anterior: prod.stock_actual,
      stock_posterior,
      fecha: new Date().toISOString(),
      usuario: data.usuario,
      referencia: data.referencia,
      notas: data.notas,
    });
    onRefresh();
    toast.success('Movimiento registrado');
    setShowForm(false);
    reset();
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Movimientos</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-1" /> Registrar Movimiento
        </Button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Select value={tipoFilter} onValueChange={setTipoFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="entrada">Entrada</SelectItem>
            <SelectItem value="salida">Salida</SelectItem>
            <SelectItem value="ajuste">Ajuste</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Label className="text-sm whitespace-nowrap">Desde</Label>
          <Input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} className="w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-sm whitespace-nowrap">Hasta</Label>
          <Input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} className="w-40" />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Referencia</TableHead>
              <TableHead>Usuario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => {
              const prod = productos.find((p) => p.id === m.producto_id);
              return (
                <TableRow key={m.id}>
                  <TableCell className="text-sm">{formatDate(m.fecha)}</TableCell>
                  <TableCell className="font-medium text-sm">{prod?.nombre ?? m.producto_id}</TableCell>
                  <TableCell><MovBadge tipo={m.tipo} /></TableCell>
                  <TableCell className="text-right font-semibold">{m.cantidad}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {m.stock_anterior} → {m.stock_posterior}
                  </TableCell>
                  <TableCell className="text-sm">{m.referencia ?? '-'}</TableCell>
                  <TableCell className="text-sm">{m.usuario}</TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No se encontraron movimientos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showForm} onOpenChange={() => setShowForm(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar Movimiento</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label>Producto</Label>
              <Select
                value={watch('producto_id')}
                onValueChange={(v) => setValue('producto_id', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona producto" />
                </SelectTrigger>
                <SelectContent>
                  {productos.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nombre} (stock: {p.stock_actual})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.producto_id && <p className="text-xs text-red-500">{errors.producto_id.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Tipo</Label>
                <Select
                  value={watch('tipo')}
                  onValueChange={(v) => setValue('tipo', v as MovimientoForm['tipo'])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="salida">Salida</SelectItem>
                    <SelectItem value="ajuste">Ajuste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Cantidad</Label>
                <Input type="number" min={1} {...register('cantidad')} />
                {errors.cantidad && <p className="text-xs text-red-500">{errors.cantidad.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label>Usuario</Label>
              <Input {...register('usuario')} />
              {errors.usuario && <p className="text-xs text-red-500">{errors.usuario.message}</p>}
            </div>

            <div className="space-y-1">
              <Label>Referencia</Label>
              <Input {...register('referencia')} placeholder="VTA-001, PED-001..." />
            </div>

            <div className="space-y-1">
              <Label>Notas</Label>
              <Input {...register('notas')} placeholder="Notas opcionales" />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">Registrar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ── Proveedores ───────────────────────────────────────────────────────────────

function ProveedoresView({
  proveedores,
  onRefresh,
}: {
  proveedores: Proveedor[];
  onRefresh: () => void;
}) {
  const [editTarget, setEditTarget] = useState<Proveedor | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProveedorForm>({
    resolver: zodResolver(proveedorSchema),
    defaultValues: { activo: true, categorias: '' },
  });

  function openCreate() {
    setEditTarget(null);
    reset({ activo: true, categorias: '' });
    setShowForm(true);
  }

  function openEdit(p: Proveedor) {
    setEditTarget(p);
    reset({
      nombre: p.nombre,
      contacto: p.contacto ?? '',
      email: p.email ?? '',
      telefono: p.telefono ?? '',
      direccion: p.direccion ?? '',
      categorias: p.categorias.join(', '),
      activo: p.activo,
    });
    setShowForm(true);
  }

  function onSubmit(data: ProveedorForm) {
    const now = new Date().toISOString();
    const proveedor: Proveedor = editTarget
      ? {
          ...editTarget,
          ...data,
          categorias: data.categorias.split(',').map((c) => c.trim()).filter(Boolean),
        }
      : {
          id: crypto.randomUUID(),
          ...data,
          categorias: data.categorias.split(',').map((c) => c.trim()).filter(Boolean),
          creado_en: now,
        };
    saveProveedor(proveedor);
    onRefresh();
    toast.success(editTarget ? 'Proveedor actualizado' : 'Proveedor creado');
    setShowForm(false);
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Proveedores</h1>
        <Button onClick={openCreate}>
          <Plus size={16} className="mr-1" /> Nuevo Proveedor
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Categorías</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proveedores.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.nombre}</TableCell>
                <TableCell>{p.contacto ?? '-'}</TableCell>
                <TableCell className="text-sm">{p.email ?? '-'}</TableCell>
                <TableCell>{p.telefono ?? '-'}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {p.categorias.map((c) => (
                      <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      p.activo
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }
                  >
                    {p.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                    <Pencil size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showForm} onOpenChange={() => setShowForm(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Editar Proveedor' : 'Nuevo Proveedor'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label>Nombre</Label>
              <Input {...register('nombre')} />
              {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Contacto</Label>
                <Input {...register('contacto')} />
              </div>
              <div className="space-y-1">
                <Label>Teléfono</Label>
                <Input {...register('telefono')} />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" {...register('email')} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <Label>Dirección</Label>
              <Input {...register('direccion')} />
            </div>
            <div className="space-y-1">
              <Label>Categorías (separadas por coma)</Label>
              <Input {...register('categorias')} placeholder="Vinos, Licores, Cervezas" />
              {errors.categorias && <p className="text-xs text-red-500">{errors.categorias.message}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="prov-activo" {...register('activo')} className="h-4 w-4" />
              <Label htmlFor="prov-activo">Proveedor activo</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">{editTarget ? 'Guardar cambios' : 'Crear proveedor'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ── Pedidos ───────────────────────────────────────────────────────────────────

function PedidosView({
  pedidos,
  productos,
  proveedores,
  onRefresh,
}: {
  pedidos: Pedido[];
  productos: Producto[];
  proveedores: Proveedor[];
  onRefresh: () => void;
}) {
  const [viewPedido, setViewPedido] = useState<Pedido | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  function pedidoTotal(p: Pedido): number {
    return p.lineas.reduce(
      (acc, l) => acc + l.cantidad_pedida * l.precio_unitario,
      0,
    );
  }

  function marcarEnviado(p: Pedido) {
    savePedido({ ...p, estado: 'enviado' });
    onRefresh();
    toast.success(`Pedido ${p.numero} marcado como enviado`);
  }

  function registrarRecepcion(p: Pedido) {
    const updated: Pedido = {
      ...p,
      estado: 'recibido',
      fecha_recepcion: new Date().toISOString(),
      lineas: p.lineas.map((l) => ({ ...l, cantidad_recibida: l.cantidad_pedida })),
    };
    savePedido(updated);
    onRefresh();
    toast.success(`Recepción del pedido ${p.numero} registrada`);
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={16} className="mr-1" /> Nuevo Pedido
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Fecha Pedido</TableHead>
              <TableHead>Fecha Entrega</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...pedidos]
              .sort((a, b) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())
              .map((p) => {
                const prov = proveedores.find((v) => v.id === p.proveedor_id);
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-sm">{p.numero}</TableCell>
                    <TableCell>{prov?.nombre ?? '-'}</TableCell>
                    <TableCell className="text-sm">{formatDate(p.fecha_pedido)}</TableCell>
                    <TableCell className="text-sm">
                      {p.fecha_entrega_esperada ? formatDate(p.fecha_entrega_esperada) : '-'}
                    </TableCell>
                    <TableCell><PedidoBadge estado={p.estado} /></TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatMoney(pedidoTotal(p))}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewPedido(p)}
                        >
                          <Eye size={13} className="mr-1" /> Ver
                        </Button>
                        {p.estado === 'borrador' && (
                          <Button size="sm" variant="outline" onClick={() => marcarEnviado(p)}>
                            Enviar
                          </Button>
                        )}
                        {(p.estado === 'enviado' || p.estado === 'recibido_parcial') && (
                          <Button size="sm" onClick={() => registrarRecepcion(p)}>
                            Recibir
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            {pedidos.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No hay pedidos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pedido detail dialog */}
      <Dialog open={!!viewPedido} onOpenChange={() => setViewPedido(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Pedido {viewPedido?.numero}</DialogTitle>
          </DialogHeader>
          {viewPedido && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Proveedor</p>
                  <p className="font-medium">
                    {proveedores.find((v) => v.id === viewPedido.proveedor_id)?.nombre ?? '-'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estado</p>
                  <PedidoBadge estado={viewPedido.estado} />
                </div>
                <div>
                  <p className="text-muted-foreground">Fecha pedido</p>
                  <p>{formatDate(viewPedido.fecha_pedido)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fecha entrega esperada</p>
                  <p>
                    {viewPedido.fecha_entrega_esperada
                      ? formatDate(viewPedido.fecha_entrega_esperada)
                      : '-'}
                  </p>
                </div>
              </div>
              {viewPedido.notas && (
                <p className="text-sm text-muted-foreground bg-gray-50 rounded p-2">
                  {viewPedido.notas}
                </p>
              )}
              <Separator />
              <h3 className="text-sm font-semibold">Líneas del pedido</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-right">Pedido</TableHead>
                    <TableHead className="text-right">Recibido</TableHead>
                    <TableHead className="text-right">P. Unitario</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {viewPedido.lineas.map((l) => {
                    const prod = productos.find((p) => p.id === l.producto_id);
                    return (
                      <TableRow key={l.id}>
                        <TableCell>{prod?.nombre ?? l.producto_id}</TableCell>
                        <TableCell className="text-right">{l.cantidad_pedida}</TableCell>
                        <TableCell className="text-right">{l.cantidad_recibida}</TableCell>
                        <TableCell className="text-right">{formatMoney(l.precio_unitario)}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatMoney(l.cantidad_pedida * l.precio_unitario)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="flex justify-end text-sm font-bold">
                Total:{' '}
                {formatMoney(
                  viewPedido.lineas.reduce(
                    (a, l) => a + l.cantidad_pedida * l.precio_unitario,
                    0,
                  ),
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create order dialog */}
      <CreatePedidoDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        productos={productos}
        proveedores={proveedores}
        pedidoCount={pedidos.length}
        onSave={(p) => {
          savePedido(p);
          onRefresh();
          toast.success(`Pedido ${p.numero} creado`);
          setShowCreate(false);
        }}
      />
    </div>
  );
}

function CreatePedidoDialog({
  open,
  onClose,
  productos,
  proveedores,
  pedidoCount,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  productos: Producto[];
  proveedores: Proveedor[];
  pedidoCount: number;
  onSave: (p: Pedido) => void;
}) {
  const [proveedorId, setProveedorId] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [notas, setNotas] = useState('');
  const [lineas, setLineas] = useState<
    { productoId: string; cantidad: number; precio: number }[]
  >([{ productoId: '', cantidad: 1, precio: 0 }]);

  function addLinea() {
    setLineas((prev) => [...prev, { productoId: '', cantidad: 1, precio: 0 }]);
  }

  function removeLinea(idx: number) {
    setLineas((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateLinea(
    idx: number,
    key: 'productoId' | 'cantidad' | 'precio',
    val: string | number,
  ) {
    setLineas((prev) =>
      prev.map((l, i) => {
        if (i !== idx) return l;
        if (key === 'productoId') {
          const prod = productos.find((p) => p.id === val);
          return { ...l, productoId: String(val), precio: prod?.precio_compra ?? 0 };
        }
        return { ...l, [key]: Number(val) };
      }),
    );
  }

  function handleSave() {
    if (!proveedorId) {
      toast.error('Selecciona un proveedor');
      return;
    }
    const validLineas = lineas.filter((l) => l.productoId);
    if (validLineas.length === 0) {
      toast.error('Añade al menos una línea');
      return;
    }

    const numero = `PED-${new Date().getFullYear()}-${String(pedidoCount + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();

    const pedido: Pedido = {
      id: crypto.randomUUID(),
      numero,
      proveedor_id: proveedorId,
      estado: 'borrador',
      fecha_pedido: now,
      fecha_entrega_esperada: fechaEntrega ? new Date(fechaEntrega).toISOString() : undefined,
      lineas: validLineas.map((l) => ({
        id: crypto.randomUUID(),
        producto_id: l.productoId,
        cantidad_pedida: l.cantidad,
        cantidad_recibida: 0,
        precio_unitario: l.precio,
      })),
      notas: notas || undefined,
      creado_en: now,
    };
    onSave(pedido);
    setProveedorId('');
    setFechaEntrega('');
    setNotas('');
    setLineas([{ productoId: '', cantidad: 1, precio: 0 }]);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Pedido</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Proveedor</Label>
              <Select value={proveedorId} onValueChange={setProveedorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {proveedores.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Fecha de entrega esperada</Label>
              <Input type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Notas</Label>
            <Input value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Notas del pedido" />
          </div>

          <Separator />
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Líneas del pedido</h3>
            <Button type="button" size="sm" variant="outline" onClick={addLinea}>
              <Plus size={13} className="mr-1" /> Añadir línea
            </Button>
          </div>

          {lineas.map((l, idx) => (
            <div key={idx} className="flex gap-2 items-end">
              <div className="flex-1 space-y-1">
                <Label className="text-xs">Producto</Label>
                <Select
                  value={l.productoId}
                  onValueChange={(v) => updateLinea(idx, 'productoId', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {productos.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-24 space-y-1">
                <Label className="text-xs">Cantidad</Label>
                <Input
                  type="number"
                  min={1}
                  value={l.cantidad}
                  onChange={(e) => updateLinea(idx, 'cantidad', e.target.value)}
                />
              </div>
              <div className="w-28 space-y-1">
                <Label className="text-xs">P. Unitario €</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={l.precio}
                  onChange={(e) => updateLinea(idx, 'precio', e.target.value)}
                />
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="text-red-500 mb-0.5"
                onClick={() => removeLinea(idx)}
                disabled={lineas.length === 1}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}

          <div className="text-right text-sm font-semibold">
            Total:{' '}
            {formatMoney(
              lineas.reduce((a, l) => a + l.cantidad * l.precio, 0),
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Crear pedido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Alertas ───────────────────────────────────────────────────────────────────

function AlertasView({
  productos,
  proveedores,
  onNavigatePedidos,
}: {
  productos: Producto[];
  proveedores: Proveedor[];
  onNavigatePedidos: () => void;
}) {
  const criticos = productos.filter((p) => p.activo && p.stock_actual === 0);
  const bajos = productos.filter(
    (p) => p.activo && p.stock_actual > 0 && p.stock_actual < p.stock_minimo,
  );

  if (criticos.length === 0 && bajos.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full gap-4 text-center">
        <CheckCircle2 size={56} className="text-green-500" />
        <h1 className="text-2xl font-bold">Todo en orden</h1>
        <p className="text-muted-foreground">
          Todos los productos están por encima del stock mínimo.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Alertas de Stock</h1>

      {criticos.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
            <AlertTriangle size={20} /> Stock Crítico ({criticos.length})
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {criticos.map((p) => {
              const prov = proveedores.find((v) => v.id === p.proveedor_id);
              return (
                <AlertCard
                  key={p.id}
                  producto={p}
                  proveedor={prov}
                  variant="critico"
                  onPedido={onNavigatePedidos}
                />
              );
            })}
          </div>
        </section>
      )}

      {bajos.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-amber-600 flex items-center gap-2">
            <AlertTriangle size={20} /> Stock Bajo ({bajos.length})
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {bajos.map((p) => {
              const prov = proveedores.find((v) => v.id === p.proveedor_id);
              return (
                <AlertCard
                  key={p.id}
                  producto={p}
                  proveedor={prov}
                  variant="bajo"
                  onPedido={onNavigatePedidos}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function AlertCard({
  producto,
  proveedor,
  variant,
  onPedido,
}: {
  producto: Producto;
  proveedor: Proveedor | undefined;
  variant: 'critico' | 'bajo';
  onPedido: () => void;
}) {
  const isCritico = variant === 'critico';
  return (
    <div
      className={`rounded-lg border p-4 space-y-3 ${
        isCritico ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'
      }`}
    >
      <div>
        <p className="font-semibold text-sm">{producto.nombre}</p>
        <p className="text-xs text-muted-foreground font-mono">{producto.sku}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Stock actual</p>
          <p className={`font-bold ${isCritico ? 'text-red-600' : 'text-amber-600'}`}>
            {producto.stock_actual} {producto.unidad}s
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Mínimo</p>
          <p className="font-medium">{producto.stock_minimo}</p>
        </div>
      </div>
      {proveedor && (
        <p className="text-xs text-muted-foreground">
          Proveedor: <span className="font-medium">{proveedor.nombre}</span>
        </p>
      )}
      <Button size="sm" variant="outline" className="w-full" onClick={onPedido}>
        <ShoppingCart size={13} className="mr-1" /> Crear pedido
      </Button>
    </div>
  );
}
