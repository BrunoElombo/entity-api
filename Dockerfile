# Utiliser l'image de base Node.js
FROM node:20.10.0

# Définir le répertoire de travail
WORKDIR /App/Entity

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances Node.js
RUN npm install

RUN npm install @prisma/client@5.12.0 prisma@5.12.0

# Copier le reste du projet
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port (3000 est souvent utilisé pour Express)
EXPOSE 3000

# Lancer l'application
CMD ["node", "index.js"]
