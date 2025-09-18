# 🔧 Guía de Troubleshooting - EcoTrack

## ❌ Problemas Comunes y Soluciones

### 1. 🔥 Error: "Cannot find module 'react-native-worklets/plugin'"

**Problema**: Error de Babel con react-native-reanimated después de limpiar dependencias.

**Solución**:
```bash
# Limpiar caché de npm y node_modules
npm cache clean --force
rm -rf node_modules package-lock.json

# Reinstalar dependencias
npm install --legacy-peer-deps

# Limpiar caché de Expo
npx expo start --clear
```

### 2. 🌐 Error: "Web Bundling failed"

**Problema**: Problemas de bundling para web.

**Solución**:
```bash
# Limpiar caché de Metro
npx expo start --clear

# Si persiste, reinstalar expo
npm install expo@latest --legacy-peer-deps
```

### 3. 🚫 Error: "Cypress cannot connect to localhost:8081"

**Problema**: La aplicación web no está corriendo.

**Solución**:
```bash
# Paso 1: Iniciar la aplicación web
npm run web

# Paso 2: Esperar a que aparezca "Web Bundling complete"
# Paso 3: Verificar que localhost:8081 esté disponible
# Paso 4: Ejecutar Cypress
npm run test:e2e:open
```

### 4. 📱 Error: "Module resolution failed"

**Problema**: Problemas con resolución de módulos.

**Solución**:
```bash
# Verificar que babel.config.js existe y es correcto
# Contenido correcto:
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [],
  };
};
```

### 5. ⚡ Error: "Metro bundler issues"

**Problema**: Problemas con Metro bundler.

**Solución**:
```bash
# Reiniciar Metro con caché limpia
npx expo start --clear --reset-cache

# Si persiste, verificar metro.config.js
```

## 🚀 Pasos para Iniciar Correctamente

### Orden Correcto de Comandos:

```bash
# 1. Limpiar todo (si hay problemas)
npm cache clean --force
rm -rf node_modules package-lock.json

# 2. Reinstalar dependencias
npm install --legacy-peer-deps

# 3. Iniciar aplicación web
npm run web

# 4. Esperar a que aparezca "Web Bundling complete"

# 5. En otra terminal, ejecutar Cypress
npm run test:e2e:open
```

## 🔍 Verificaciones de Estado

### Verificar que la aplicación web está corriendo:
```bash
# Abrir navegador en http://localhost:8081
# Debe mostrar la página principal de EcoTrack
```

### Verificar dependencias críticas:
```bash
npm list expo
npm list react-native-reanimated
npm list babel-preset-expo
```

### Verificar configuración de Babel:
```bash
# Debe existir babel.config.js con preset de expo
cat babel.config.js
```

## 📞 Contacto

Si los problemas persisten, verificar:
1. ✅ Node.js versión compatible (16+ recomendado)
2. ✅ npm versión actualizada
3. ✅ Expo CLI instalado globalmente: `npm install -g @expo/cli`
4. ✅ Puerto 8081 no ocupado por otra aplicación

## 🎯 Estado Actual Esperado

Después de seguir esta guía:
- ✅ `npm run web` debe iniciar sin errores
- ✅ `http://localhost:8081` debe mostrar EcoTrack
- ✅ `npm run test:e2e:open` debe abrir Cypress
- ✅ Las pruebas E2E deben ejecutarse correctamente
