export interface Producto {
  id: string;
  sku: string;
  nombre: string;
  categoria: string;
  descripcion?: string;
  stock_actual: number;
  stock_minimo: number;
  stock_maximo: number;
  unidad: string;
  precio_compra: number;
  precio_venta: number;
  proveedor_id: string;
  ubicacion: string;
  activo: boolean;
  creado_en: string;
  actualizado_en: string;
}

export interface Movimiento {
  id: string;
  producto_id: string;
  tipo: 'entrada' | 'salida' | 'ajuste';
  cantidad: number;
  stock_anterior: number;
  stock_posterior: number;
  fecha: string;
  usuario: string;
  referencia?: string;
  notas?: string;
}

export interface Proveedor {
  id: string;
  nombre: string;
  contacto?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  categorias: string[];
  activo: boolean;
  creado_en: string;
}

export interface LineaPedido {
  id: string;
  producto_id: string;
  cantidad_pedida: number;
  cantidad_recibida: number;
  precio_unitario: number;
}

export interface Pedido {
  id: string;
  numero: string;
  proveedor_id: string;
  estado: 'borrador' | 'enviado' | 'recibido_parcial' | 'recibido' | 'cancelado';
  fecha_pedido: string;
  fecha_entrega_esperada?: string;
  fecha_recepcion?: string;
  lineas: LineaPedido[];
  notas?: string;
  creado_en: string;
}
