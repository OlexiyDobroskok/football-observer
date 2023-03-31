import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:{
      'src': path.resolve(__dirname,'./src'),
      'components': path.resolve(__dirname,'./src/components'),
      'assets': path.resolve(__dirname,'./src/assets'),
      'hooks': path.resolve(__dirname,'./src/hooks'),
      'modules': path.resolve(__dirname,'./src/modules'),
      'pages': path.resolve(__dirname,'./src/pages'),
      'store': path.resolve(__dirname,'./src/store'),
      'UI': path.resolve(__dirname,'./src/UI'),
      'styles': path.resolve(__dirname,'./src/styles'),
    }
  }
})
