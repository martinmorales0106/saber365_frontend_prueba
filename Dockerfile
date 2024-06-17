# Utiliza una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install --omit=dev

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto que usará la aplicación
EXPOSE 4173

# Define el comando de inicio de la aplicación
CMD ["npm", "start"]
