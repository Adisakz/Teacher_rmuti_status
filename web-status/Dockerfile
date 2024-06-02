FROM nginx:latest

# คัดลอกไฟล์เนื้อหาของโค้ดของเว็บไซต์ไปยัง /var/www/html
COPY . /var/www/html

# Set permissions for /var/www/html (use chmod)
RUN chmod -R 777 /var/www/html

# Expose the port your web server listens on (if necessary)
EXPOSE 80