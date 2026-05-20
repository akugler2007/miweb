import type { Producto, Movimiento, Proveedor, Pedido } from './stock-types';

const KEYS = {
  productos: 'licors_moya_productos',
  movimientos: 'licors_moya_movimientos',
  proveedores: 'licors_moya_proveedores',
  pedidos: 'licors_moya_pedidos',
};

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getProductos(): Producto[] {
  return read<Producto>(KEYS.productos);
}

export function saveProducto(p: Producto): void {
  const list = getProductos();
  const idx = list.findIndex((x) => x.id === p.id);
  if (idx >= 0) {
    list[idx] = { ...p, actualizado_en: new Date().toISOString() };
  } else {
    list.push(p);
  }
  write(KEYS.productos, list);
}

export function deleteProducto(id: string): void {
  write(KEYS.productos, getProductos().filter((p) => p.id !== id));
}

export function getMovimientos(): Movimiento[] {
  return read<Movimiento>(KEYS.movimientos);
}

export function registrarMovimiento(m: Omit<Movimiento, 'id'>): Movimiento {
  const nuevo: Movimiento = { ...m, id: crypto.randomUUID() };
  const movimientos = getMovimientos();
  movimientos.push(nuevo);
  write(KEYS.movimientos, movimientos);

  const productos = getProductos();
  const idx = productos.findIndex((p) => p.id === m.producto_id);
  if (idx >= 0) {
    productos[idx] = {
      ...productos[idx],
      stock_actual: m.stock_posterior,
      actualizado_en: new Date().toISOString(),
    };
    write(KEYS.productos, productos);
  }

  return nuevo;
}

export function getProveedores(): Proveedor[] {
  return read<Proveedor>(KEYS.proveedores);
}

export function saveProveedor(p: Proveedor): void {
  const list = getProveedores();
  const idx = list.findIndex((x) => x.id === p.id);
  if (idx >= 0) {
    list[idx] = p;
  } else {
    list.push(p);
  }
  write(KEYS.proveedores, list);
}

export function getPedidos(): Pedido[] {
  return read<Pedido>(KEYS.pedidos);
}

export function savePedido(p: Pedido): void {
  const list = getPedidos();
  const idx = list.findIndex((x) => x.id === p.id);

  if (idx >= 0 && p.estado === 'recibido' && list[idx].estado !== 'recibido') {
    const productos = getProductos();
    for (const linea of p.lineas) {
      const pIdx = productos.findIndex((prod) => prod.id === linea.producto_id);
      if (pIdx >= 0) {
        const anterior = productos[pIdx].stock_actual;
        const posterior = anterior + linea.cantidad_recibida;
        registrarMovimiento({
          producto_id: linea.producto_id,
          tipo: 'entrada',
          cantidad: linea.cantidad_recibida,
          stock_anterior: anterior,
          stock_posterior: posterior,
          fecha: new Date().toISOString(),
          usuario: 'Sistema',
          referencia: p.numero,
          notas: `Recepción automática pedido ${p.numero}`,
        });
      }
    }
  }

  if (idx >= 0) {
    list[idx] = p;
  } else {
    list.push(p);
  }
  write(KEYS.pedidos, list);
}

export function initSeedData(): void {
  if (localStorage.getItem(KEYS.productos)) return;

  const now = new Date();
  const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();

  const proveedores: Proveedor[] = [
    {
      id: 'prov-1',
      nombre: 'Bodegas Torres',
      contacto: 'Pere Torres',
      email: 'pedidos@torres.es',
      telefono: '93 817 74 87',
      direccion: 'Finca El Maset s/n, Pacs del Penedès, Barcelona',
      categorias: ['Vinos', 'Espirituosos'],
      activo: true,
      creado_en: daysAgo(180),
    },
    {
      id: 'prov-2',
      nombre: 'Casa Mariol',
      contacto: 'Joan Mariol',
      email: 'info@casamariol.com',
      telefono: '977 41 31 18',
      direccion: 'Carrer Major 12, Batea, Tarragona',
      categorias: ['Vinos', 'Licores'],
      activo: true,
      creado_en: daysAgo(150),
    },
    {
      id: 'prov-3',
      nombre: 'Grupo Codorníu',
      contacto: 'Marta Codorníu',
      email: 'distribuidores@codorniu.com',
      telefono: '93 891 01 25',
      direccion: 'Avda. Jaume Codorníu s/n, Sant Sadurní d\'Anoia',
      categorias: ['Cavas', 'Vinos'],
      activo: true,
      creado_en: daysAgo(120),
    },
    {
      id: 'prov-4',
      nombre: 'Beers & Co',
      contacto: 'Miquel Ferrer',
      email: 'vendes@beersco.es',
      telefono: '971 20 45 67',
      direccion: 'Polígon Son Valentí, Palma de Mallorca',
      categorias: ['Cervezas'],
      activo: true,
      creado_en: daysAgo(90),
    },
    {
      id: 'prov-5',
      nombre: 'Makro Palma',
      contacto: 'Servei al Client',
      email: 'palma@makro.es',
      telefono: '971 43 89 00',
      direccion: 'Carretera de Manacor km 3, Palma de Mallorca',
      categorias: ['Licores', 'Espirituosos', 'Cervezas'],
      activo: true,
      creado_en: daysAgo(60),
    },
  ];

  const productos: Producto[] = [
    {
      id: 'prod-1',
      sku: 'VIN-TGV-75',
      nombre: 'Vino Torres Gran Viña Sol',
      categoria: 'Vinos',
      descripcion: 'Vino blanco DO Penedès, 75cl',
      stock_actual: 48,
      stock_minimo: 24,
      stock_maximo: 120,
      unidad: 'botella',
      precio_compra: 6.50,
      precio_venta: 11.95,
      proveedor_id: 'prov-1',
      ubicacion: 'A-01',
      activo: true,
      creado_en: daysAgo(150),
      actualizado_en: daysAgo(2),
    },
    {
      id: 'prod-2',
      sku: 'VIN-TMC-75',
      nombre: 'Vino Torres Mas La Plana',
      categoria: 'Vinos',
      descripcion: 'Vino tinto DO Penedès, Cabernet Sauvignon, 75cl',
      stock_actual: 18,
      stock_minimo: 12,
      stock_maximo: 60,
      unidad: 'botella',
      precio_compra: 18.00,
      precio_venta: 32.50,
      proveedor_id: 'prov-1',
      ubicacion: 'A-02',
      activo: true,
      creado_en: daysAgo(140),
      actualizado_en: daysAgo(5),
    },
    {
      id: 'prod-3',
      sku: 'LIC-GIN-MAH-70',
      nombre: 'Gin Mahón Premium',
      categoria: 'Licores',
      descripcion: 'Ginebra artesanal de Menorca, 70cl, 40%vol',
      stock_actual: 6,
      stock_minimo: 12,
      stock_maximo: 48,
      unidad: 'botella',
      precio_compra: 14.00,
      precio_venta: 24.90,
      proveedor_id: 'prov-5',
      ubicacion: 'B-03',
      activo: true,
      creado_en: daysAgo(120),
      actualizado_en: daysAgo(1),
    },
    {
      id: 'prod-4',
      sku: 'ESP-RON-ZAC-70',
      nombre: 'Ron Zacapa 23',
      categoria: 'Espirituosos',
      descripcion: 'Ron guatemalteco añejado, 70cl, 40%vol',
      stock_actual: 0,
      stock_minimo: 6,
      stock_maximo: 24,
      unidad: 'botella',
      precio_compra: 29.50,
      precio_venta: 49.95,
      proveedor_id: 'prov-5',
      ubicacion: 'C-01',
      activo: true,
      creado_en: daysAgo(110),
      actualizado_en: daysAgo(3),
    },
    {
      id: 'prod-5',
      sku: 'CAV-COD-CLA-75',
      nombre: 'Cava Codorníu Clásico',
      categoria: 'Cavas',
      descripcion: 'Cava DO Cava Brut Nature, 75cl',
      stock_actual: 36,
      stock_minimo: 24,
      stock_maximo: 96,
      unidad: 'botella',
      precio_compra: 4.80,
      precio_venta: 8.50,
      proveedor_id: 'prov-3',
      ubicacion: 'D-01',
      activo: true,
      creado_en: daysAgo(100),
      actualizado_en: daysAgo(4),
    },
    {
      id: 'prod-6',
      sku: 'CER-EST-33',
      nombre: 'Estrella Damm 33cl',
      categoria: 'Cervezas',
      descripcion: 'Cerveza lager, pack 24 uds x 33cl',
      stock_actual: 15,
      stock_minimo: 20,
      stock_maximo: 80,
      unidad: 'caja',
      precio_compra: 18.00,
      precio_venta: 28.00,
      proveedor_id: 'prov-4',
      ubicacion: 'E-01',
      activo: true,
      creado_en: daysAgo(90),
      actualizado_en: daysAgo(1),
    },
    {
      id: 'prod-7',
      sku: 'VIN-MAR-BLA-75',
      nombre: 'Vino Casa Mariol Blanc',
      categoria: 'Vinos',
      descripcion: 'Vino blanco DO Terra Alta, 75cl',
      stock_actual: 30,
      stock_minimo: 18,
      stock_maximo: 72,
      unidad: 'botella',
      precio_compra: 5.20,
      precio_venta: 9.50,
      proveedor_id: 'prov-2',
      ubicacion: 'A-03',
      activo: true,
      creado_en: daysAgo(80),
      actualizado_en: daysAgo(6),
    },
    {
      id: 'prod-8',
      sku: 'ESP-WHI-JAM-70',
      nombre: 'Whisky Jameson',
      categoria: 'Espirituosos',
      descripcion: 'Irish Whiskey, 70cl, 40%vol',
      stock_actual: 9,
      stock_minimo: 12,
      stock_maximo: 36,
      unidad: 'botella',
      precio_compra: 16.50,
      precio_venta: 27.95,
      proveedor_id: 'prov-5',
      ubicacion: 'C-02',
      activo: true,
      creado_en: daysAgo(75),
      actualizado_en: daysAgo(2),
    },
    {
      id: 'prod-9',
      sku: 'LIC-TRI-70',
      nombre: 'Triple Sec Cointreau',
      categoria: 'Licores',
      descripcion: 'Licor de naranja francés, 70cl, 40%vol',
      stock_actual: 4,
      stock_minimo: 8,
      stock_maximo: 24,
      unidad: 'botella',
      precio_compra: 19.00,
      precio_venta: 32.00,
      proveedor_id: 'prov-5',
      ubicacion: 'B-04',
      activo: true,
      creado_en: daysAgo(70),
      actualizado_en: daysAgo(3),
    },
    {
      id: 'prod-10',
      sku: 'CAV-COD-ROS-75',
      nombre: 'Cava Codorníu Rosado',
      categoria: 'Cavas',
      descripcion: 'Cava Brut Rosado, 75cl',
      stock_actual: 24,
      stock_minimo: 12,
      stock_maximo: 60,
      unidad: 'botella',
      precio_compra: 6.20,
      precio_venta: 10.95,
      proveedor_id: 'prov-3',
      ubicacion: 'D-02',
      activo: true,
      creado_en: daysAgo(65),
      actualizado_en: daysAgo(7),
    },
    {
      id: 'prod-11',
      sku: 'CER-IPA-33',
      nombre: 'IPA Artesana Tramuntana',
      categoria: 'Cervezas',
      descripcion: 'Cerveza IPA artesana mallorquina, pack 12 x 33cl',
      stock_actual: 8,
      stock_minimo: 10,
      stock_maximo: 40,
      unidad: 'caja',
      precio_compra: 22.00,
      precio_venta: 36.00,
      proveedor_id: 'prov-4',
      ubicacion: 'E-02',
      activo: true,
      creado_en: daysAgo(60),
      actualizado_en: daysAgo(2),
    },
    {
      id: 'prod-12',
      sku: 'ESP-VOD-ABS-70',
      nombre: 'Vodka Absolut',
      categoria: 'Espirituosos',
      descripcion: 'Vodka sueco, 70cl, 40%vol',
      stock_actual: 22,
      stock_minimo: 12,
      stock_maximo: 48,
      unidad: 'botella',
      precio_compra: 11.50,
      precio_venta: 19.95,
      proveedor_id: 'prov-5',
      ubicacion: 'C-03',
      activo: true,
      creado_en: daysAgo(55),
      actualizado_en: daysAgo(4),
    },
    {
      id: 'prod-13',
      sku: 'VIN-TOR-SAN-75',
      nombre: 'Sangre de Toro Torres',
      categoria: 'Vinos',
      descripcion: 'Vino tinto DO Catalunya, 75cl',
      stock_actual: 0,
      stock_minimo: 24,
      stock_maximo: 96,
      unidad: 'botella',
      precio_compra: 4.50,
      precio_venta: 8.00,
      proveedor_id: 'prov-1',
      ubicacion: 'A-04',
      activo: true,
      creado_en: daysAgo(50),
      actualizado_en: daysAgo(1),
    },
    {
      id: 'prod-14',
      sku: 'LIC-AMO-DIS-70',
      nombre: 'Amaretto Disaronno',
      categoria: 'Licores',
      descripcion: 'Licor de almendra italiano, 70cl, 28%vol',
      stock_actual: 11,
      stock_minimo: 6,
      stock_maximo: 24,
      unidad: 'botella',
      precio_compra: 13.00,
      precio_venta: 22.00,
      proveedor_id: 'prov-5',
      ubicacion: 'B-05',
      activo: true,
      creado_en: daysAgo(45),
      actualizado_en: daysAgo(5),
    },
    {
      id: 'prod-15',
      sku: 'CER-HEI-25',
      nombre: 'Heineken 25cl',
      categoria: 'Cervezas',
      descripcion: 'Cerveza holandesa, pack 24 x 25cl',
      stock_actual: 45,
      stock_minimo: 20,
      stock_maximo: 100,
      unidad: 'caja',
      precio_compra: 15.00,
      precio_venta: 24.00,
      proveedor_id: 'prov-4',
      ubicacion: 'E-03',
      activo: true,
      creado_en: daysAgo(40),
      actualizado_en: daysAgo(3),
    },
  ];

  const usuarios = ['Carlos Moyà', 'Ana López', 'Sistema'];

  const movimientos: Movimiento[] = [];

  const addMov = (
    producto_id: string,
    tipo: Movimiento['tipo'],
    cantidad: number,
    stock_anterior: number,
    daysBack: number,
    usuario: string,
    referencia?: string,
    notas?: string,
  ): number => {
    let stock_posterior: number;
    if (tipo === 'entrada') stock_posterior = stock_anterior + cantidad;
    else if (tipo === 'salida') stock_posterior = Math.max(0, stock_anterior - cantidad);
    else stock_posterior = cantidad;

    movimientos.push({
      id: crypto.randomUUID(),
      producto_id,
      tipo,
      cantidad,
      stock_anterior,
      stock_posterior,
      fecha: daysAgo(daysBack),
      usuario,
      referencia,
      notas,
    });
    return stock_posterior;
  };

  addMov('prod-1', 'entrada', 48, 0, 60, 'Sistema', 'PED-2024-001', 'Stock inicial');
  addMov('prod-2', 'entrada', 24, 0, 60, 'Sistema', 'PED-2024-001', 'Stock inicial');
  addMov('prod-3', 'entrada', 24, 0, 58, 'Sistema', 'PED-2024-002', 'Stock inicial');
  addMov('prod-4', 'entrada', 12, 0, 58, 'Sistema', 'PED-2024-002', 'Stock inicial');
  addMov('prod-5', 'entrada', 48, 0, 57, 'Sistema', 'PED-2024-003', 'Stock inicial');
  addMov('prod-6', 'entrada', 30, 0, 57, 'Sistema', 'PED-2024-003', 'Stock inicial');
  addMov('prod-7', 'entrada', 36, 0, 55, 'Sistema', 'PED-2024-004', 'Stock inicial');
  addMov('prod-8', 'entrada', 18, 0, 55, 'Sistema', 'PED-2024-004', 'Stock inicial');
  addMov('prod-9', 'entrada', 12, 0, 54, 'Sistema', 'PED-2024-005', 'Stock inicial');
  addMov('prod-10', 'entrada', 36, 0, 54, 'Sistema', 'PED-2024-005', 'Stock inicial');
  addMov('prod-11', 'entrada', 20, 0, 52, 'Sistema', 'PED-2024-006', 'Stock inicial');
  addMov('prod-12', 'entrada', 24, 0, 52, 'Sistema', 'PED-2024-006', 'Stock inicial');
  addMov('prod-13', 'entrada', 48, 0, 50, 'Sistema', 'PED-2024-007', 'Stock inicial');
  addMov('prod-14', 'entrada', 12, 0, 50, 'Sistema', 'PED-2024-007', 'Stock inicial');
  addMov('prod-15', 'entrada', 60, 0, 48, 'Sistema', 'PED-2024-008', 'Stock inicial');

  addMov('prod-1', 'salida', 12, 48, 45, usuarios[0], 'VTA-001');
  addMov('prod-5', 'salida', 8, 48, 44, usuarios[0], 'VTA-002');
  addMov('prod-7', 'salida', 6, 36, 42, usuarios[1], 'VTA-003');
  addMov('prod-12', 'salida', 5, 24, 40, usuarios[0], 'VTA-004');
  addMov('prod-2', 'salida', 4, 24, 38, usuarios[1], 'VTA-005');
  addMov('prod-15', 'salida', 8, 60, 36, usuarios[0], 'VTA-006');
  addMov('prod-4', 'salida', 6, 12, 35, usuarios[1], 'VTA-007');
  addMov('prod-6', 'salida', 5, 30, 33, usuarios[0], 'VTA-008');
  addMov('prod-13', 'salida', 10, 48, 30, usuarios[0], 'VTA-009');
  addMov('prod-3', 'salida', 8, 24, 28, usuarios[1], 'VTA-010');
  addMov('prod-9', 'salida', 4, 12, 27, usuarios[0], 'VTA-011');
  addMov('prod-11', 'salida', 6, 20, 25, usuarios[1], 'VTA-012');
  addMov('prod-8', 'salida', 5, 18, 22, usuarios[0], 'VTA-013');
  addMov('prod-10', 'salida', 6, 36, 20, usuarios[1], 'VTA-014');
  addMov('prod-14', 'salida', 3, 12, 18, usuarios[0], 'VTA-015');

  addMov('prod-1', 'salida', 8, 36, 15, usuarios[0], 'VTA-016');
  addMov('prod-5', 'salida', 4, 40, 14, usuarios[1], 'VTA-017');
  addMov('prod-13', 'salida', 10, 38, 12, usuarios[0], 'VTA-018');
  addMov('prod-4', 'salida', 6, 6, 10, usuarios[1], 'VTA-019');
  addMov('prod-12', 'salida', 2, 19, 9, usuarios[0], 'VTA-020');
  addMov('prod-6', 'salida', 5, 25, 8, usuarios[1], 'VTA-021');
  addMov('prod-2', 'salida', 2, 22, 7, usuarios[0], 'VTA-022');
  addMov('prod-3', 'salida', 2, 16, 7, usuarios[1], 'VTA-023');
  addMov('prod-8', 'salida', 3, 17, 6, usuarios[0], 'VTA-024');
  addMov('prod-9', 'salida', 4, 8, 5, usuarios[1], 'VTA-025');

  addMov('prod-3', 'ajuste', 6, 14, 4, usuarios[0], undefined, 'Corrección inventario físico');
  addMov('prod-11', 'ajuste', 8, 14, 3, usuarios[1], undefined, 'Corrección inventario físico');
  addMov('prod-13', 'salida', 13, 28, 2, usuarios[0], 'VTA-026');
  addMov('prod-4', 'salida', 6, 6, 2, usuarios[1], 'VTA-027');
  addMov('prod-15', 'salida', 7, 52, 1, usuarios[0], 'VTA-028');

  const pedidos: Pedido[] = [
    {
      id: 'ped-1',
      numero: 'PED-2025-001',
      proveedor_id: 'prov-1',
      estado: 'borrador',
      fecha_pedido: daysAgo(2),
      fecha_entrega_esperada: daysAgo(-5),
      lineas: [
        {
          id: crypto.randomUUID(),
          producto_id: 'prod-4',
          cantidad_pedida: 12,
          cantidad_recibida: 0,
          precio_unitario: 29.50,
        },
        {
          id: crypto.randomUUID(),
          producto_id: 'prod-13',
          cantidad_pedida: 48,
          cantidad_recibida: 0,
          precio_unitario: 4.50,
        },
      ],
      notas: 'Pedido urgente por stock crítico',
      creado_en: daysAgo(2),
    },
    {
      id: 'ped-2',
      numero: 'PED-2025-002',
      proveedor_id: 'prov-4',
      estado: 'enviado',
      fecha_pedido: daysAgo(7),
      fecha_entrega_esperada: daysAgo(-2),
      lineas: [
        {
          id: crypto.randomUUID(),
          producto_id: 'prod-6',
          cantidad_pedida: 20,
          cantidad_recibida: 0,
          precio_unitario: 18.00,
        },
        {
          id: crypto.randomUUID(),
          producto_id: 'prod-11',
          cantidad_pedida: 15,
          cantidad_recibida: 0,
          precio_unitario: 22.00,
        },
      ],
      creado_en: daysAgo(7),
    },
    {
      id: 'ped-3',
      numero: 'PED-2025-003',
      proveedor_id: 'prov-5',
      estado: 'recibido',
      fecha_pedido: daysAgo(30),
      fecha_entrega_esperada: daysAgo(22),
      fecha_recepcion: daysAgo(20),
      lineas: [
        {
          id: crypto.randomUUID(),
          producto_id: 'prod-8',
          cantidad_pedida: 12,
          cantidad_recibida: 12,
          precio_unitario: 16.50,
        },
        {
          id: crypto.randomUUID(),
          producto_id: 'prod-9',
          cantidad_pedida: 8,
          cantidad_recibida: 8,
          precio_unitario: 19.00,
        },
        {
          id: crypto.randomUUID(),
          producto_id: 'prod-12',
          cantidad_pedida: 24,
          cantidad_recibida: 24,
          precio_unitario: 11.50,
        },
      ],
      notas: 'Recibido sin incidencias',
      creado_en: daysAgo(30),
    },
  ];

  write(KEYS.proveedores, proveedores);
  write(KEYS.productos, productos);
  write(KEYS.movimientos, movimientos);
  write(KEYS.pedidos, pedidos);
}
