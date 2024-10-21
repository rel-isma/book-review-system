# backend/Dockerfile
# Use the official Python image as a base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY ./requirements.txt .

# Install dependencies, including dotenv
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]