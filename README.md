<img width="835" alt="Screenshot 2023-05-11 at 1 37 09 PM" src="https://github.com/roystonlek/codetoconnectf7/assets/79074359/c87dcf39-1e94-43cd-adc2-3a5d8ca6f161">

# Bank Of America Code To Connect 2023 

## Team F7 Members
1. SMU Computer Science Year 3 – Royston Lek Chun Keat  
2. SMU Computer Science Year 3 – Kang Chin Shen         
3. SMU Computer Science Year 3 – Shaun Ting             


## FICC Tech Problem Statement
* Forward Pricing Engine (5 hours 30 minutes)

## Repository High Level Structure
| codetoconnectf7 – root folder

&ensp;&ensp; | frontend – Frontend code implemented using ReactJS

&ensp;&ensp; | backend – Backend code implemented using Python Flask

&ensp;&ensp; README.md – Code documentation

&ensp;&ensp; Other Files – Code documentation

## Running The Code

### Step 1 : Clone The Application
1. Run the command ```git clone https://github.com/roystonlek/codetoconnectf7.git``` in the terminal in the prefered destination on your machine.

### Step 2 : Run The Frontend Application
1. Open a new terminal, ```cd``` to ```codetoconnectf7/frontend``` folder.
2. Run the command ```npm install``` to install the required packages.
3. Run the command ```npm run dev``` to start the frontend application on your local machine.
4. Go to ```http://127.0.0.1:5173/``` to use the application. 
5. You should see the following page after the frontend application is started:

<img width="1680" alt="Screenshot 2023-05-11 at 2 22 12 PM" src="https://github.com/roystonlek/codetoconnectf7/assets/79074359/a6b9077c-c1f3-4d27-bda3-33fde18a1df3">

### Step 3 : Run The Backend Application
1. Open a new terminal, ```cd``` to ```codetoconnectf7/backend``` folder.
2. Run the command ```pip install -r requirements.txt``` to install the required packages. 
3. Run the command ```python app.py``` to start the backend application on your local machine.
4. Go to ```http://127.0.0.1:5000/``` to ensure the backend application is started successfully.
5. You should see the phrase "Hello World!".

## User Manual For Our Application
1. After running both frontend and backend applications (and after clicking "Next->" on the first page), admin user should be able to see the following: 

<img width="1680" alt="Screenshot 2023-05-11 at 4 55 25 PM" src="https://github.com/roystonlek/codetoconnectf7/assets/79074359/3c9e8471-e465-45fa-ab66-166a6ba59a68">

2. The admin user is able to input the "Currency" and "Tenor" values of choice via text input in order to retrieve the corresponding data. (Note: we allowed free text input as we did not have a comprehensive list of all possible inputs)
3. From top to bottom, the graphs display the Ask - (minus) Bid, Bid, and Ask values for the admin user to observe. The graph is updated in REAL-TIME.
4. The table fixed to the bottom of the page displays the table showing the output for the given (Currency, Tenor) key. The table is updated in REAL-TIME (scroll to the bottom to view the entire table).
