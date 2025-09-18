# 🧪 Pruebas E2E con Cypress - EcoTrack

## 📋 Descripción

Este directorio contiene todas las pruebas End-to-End (E2E) para la aplicación EcoTrack usando Cypress. Las pruebas simulan el comportamiento real de un usuario navegando y usando la aplicación.

## 🚀 Cómo Ejecutar las Pruebas

### Requisitos Previos
1. Tener la aplicación corriendo en modo web:
   ```bash
   npm run web
   ```
   La aplicación debe estar disponible en `http://localhost:8081`

### Comandos de Pruebas

```bash
# 🔍 Abrir Cypress en modo interactivo (recomendado para desarrollo)
npm run test:e2e:open

# 🏃‍♂️ Ejecutar todas las pruebas en modo headless
npm run test:e2e

# 🎯 Ejecutar pruebas específicas
npm run cypress:run -- --spec "cypress/e2e/dashboard.cy.js"

# 📱 Ejecutar con viewport específico
npm run cypress:run -- --config viewportWidth=375,viewportHeight=667
```

## 📁 Estructura de Archivos

```
cypress/
├── e2e/                          # Pruebas End-to-End
│   ├── dashboard.cy.js           # Pruebas del dashboard corporativo
│   ├── navigation.cy.js          # Pruebas de navegación general
│   ├── forms.cy.js               # Pruebas de formularios CRUD
│   ├── crud-operations.cy.js     # Pruebas de operaciones CRUD
│   └── responsiveness.cy.js      # Pruebas de responsividad
├── fixtures/                     # Datos de prueba
│   └── test-data.json           # Datos mock para formularios
├── support/                      # Configuración y comandos personalizados
│   ├── e2e.js                   # Configuración global E2E
│   └── commands.js              # Comandos personalizados
└── README.md                    # Esta documentación
```

## 🧪 Tipos de Pruebas

### 1. **Dashboard (dashboard.cy.js)**
- ✅ Navegación al dashboard
- ✅ Visualización de métricas
- ✅ Acciones rápidas funcionales
- ✅ Top performers ranking
- ✅ Gráficos de rendimiento

### 2. **Navegación (navigation.cy.js)**
- ✅ Navegación entre pantallas
- ✅ Botones de retroceso
- ✅ Navegación por tabs
- ✅ URLs correctas

### 3. **Formularios (forms.cy.js)**
- ✅ Carga de formularios
- ✅ Responsividad en diferentes pantallas
- ✅ Elementos de interfaz presentes
- ✅ Navegación desde/hacia formularios

### 4. **Operaciones CRUD (crud-operations.cy.js)**
- ✅ Crear nuevos registros
- ✅ Editar registros existentes
- ✅ Eliminar registros
- ✅ Cambiar estados (activo/inactivo)
- ✅ Filtros y búsquedas

### 5. **Responsividad (responsiveness.cy.js)**
- ✅ Móvil (375x667)
- ✅ Tablet (768x1024)
- ✅ Desktop (1280x720)
- ✅ Large Desktop (1920x1080)

## 🔧 Comandos Personalizados

### Navegación
- `cy.visitAndWait(url)` - Visita una URL y espera que cargue
- `cy.clickAndWait(selector)` - Hace clic y espera
- `cy.shouldBeOnPage(path)` - Verifica que estamos en la página correcta

### Formularios
- `cy.fillForm(formData)` - Completa un formulario con datos
- `cy.loginAsAdmin()` - Login como administrador
- `cy.createEmployee(data)` - Crea un empleado

### Utilidades
- `cy.waitForPageLoad()` - Espera que la página termine de cargar
- `cy.shouldContainText(text)` - Verifica que un elemento contiene texto

## 📊 Métricas de Cobertura

Las pruebas cubren:
- ✅ **6 pantallas CRUD** (Empleados, Empresas, Áreas, Actividades, Metas, Lecciones)
- ✅ **6 formularios** responsive
- ✅ **1 dashboard** corporativo completo
- ✅ **4 viewports** diferentes
- ✅ **Navegación completa** de la aplicación

## 🎯 Mejores Prácticas

1. **Siempre ejecutar con la app web corriendo** en `http://localhost:8081`
2. **Usar data-testid** para elementos críticos en lugar de texto
3. **Probar en múltiples viewports** para asegurar responsividad
4. **Usar fixtures** para datos de prueba consistentes
5. **Verificar URLs** después de navegaciones importantes

## 🐛 Troubleshooting

### Problema: "Cannot connect to localhost:8081"
**Solución**: Asegúrate de que la app esté corriendo:
```bash
npm run web
```

### Problema: "Element not found"
**Solución**: Agrega `cy.wait()` o usa `cy.waitForPageLoad()` antes de buscar elementos.

### Problema: "Viewport issues"
**Solución**: Las pruebas están optimizadas para React Native Web. Algunos elementos pueden renderizarse diferente que en web nativo.

## 📈 Próximos Pasos

1. Agregar pruebas de autenticación
2. Implementar pruebas de flujos completos (crear → editar → eliminar)
3. Agregar pruebas de validación de formularios
4. Implementar pruebas de performance
5. Agregar pruebas de accesibilidad
