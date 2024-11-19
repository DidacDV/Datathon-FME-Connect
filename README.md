
# Datathon FME Connect 2024

**Collaborators:**  
- Rozhina Ahmadi  
- Omar Cornejo Vargas  
- Didac Dalmases Valcarcel  
- Rubén Palà Vacas  

## Overview  
This project was developed for the **2024 Datathon**. It uses **React** for the front-end and **Python + Django** for the back-end, with a **PostgreSQL** database to manage participants' data. The application generates optimized, diverse teams from a provided dataset, ensuring the best compatibility and balance between participants.

## Features  
- **Team Formation Algorithm**: Generates teams based on user-defined parameters for diversity and compatibility.  
- **Scalable Database Management**: Pre-filters participants to streamline operations and enhance performance.  
- **Interactive Front-End**: User-friendly interface built with React.  

## Technologies  
- **Front-End**: React  
- **Back-End**: Python, Django  
- **Database**: PostgreSQL  
- **Version Control**: Git  

## Getting Started  
### Prerequisites  
Ensure the following tools are installed:  
- **Node.js** (latest stable version) and npm  
- **Python** (3.x) with pip  
- **PostgreSQL** (running locally or accessible remotely)  

### Installation  

#### Set Up the Front-End  
1. Navigate to the `src` folder:  
   ```bash
   cd src
   ```  
2. Install the required dependencies:  
   ```bash
   npm install
   ```  
3. Start the development server:  
   ```bash
   npm start
   ```  

#### Set Up the Back-End  
1. Navigate to the `backend` folder:  
   ```bash
   cd backend
   ```  
2. Install Python dependencies:  
   ```bash
   pip install -r requirements.txt
   ```  
3. Apply migrations to set up the database schema:  
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```  
4. Run the development server:  
   ```bash
   python manage.py runserver
   ```  

#### Configure the Database  
1. Ensure PostgreSQL is running locally or remotely.  
2. Create a database for the application and update the `settings.py` file in the `backend` directory with the database credentials:  
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'your_database_name',
           'USER': 'your_username',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```  

### Usage  
1. Open your browser and navigate to `http://localhost:3000` to access the front-end.  
2. Use the back-end APIs available at `http://localhost:8000`.  

## License  
This project is open-source and available under the [MIT License](LICENSE).  
