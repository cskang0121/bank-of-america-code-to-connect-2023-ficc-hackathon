![255976081-b6ad02f4-1fba-4b18-ac74-4fccb75e3cd6](https://github.com/cskang0121/bank-of-america-code-to-connect-2023-ficc-hackathon/assets/79074359/a54e9afa-69c1-4210-b498-792b78e77e20)

# Bank Of America Code To Connect 2023 

## Team F7 Members
1. SMU Computer Science Year 3 – Kang Chin Shen        
2. SMU Computer Science Year 3 – Royston Lek Chun Keat
3. SMU Computer Science Year 3 – Shaun Ting                       

## FICC Tech Problem Statement
* Forward Pricing Engine (Time Limit : 5 hours 30 minutes)

## Repository High Level Structure

```
| codetoconnectf7       # Root folder

    | frontend          # Frontend code implemented using ReactJS

    | backend           # Backend code implemented using Python Flask

    README.md           # Code documentation

    Other files 
```

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

## Credits
> Special thanks to **Bank Of America** for organising this amazing hackathon!

## Certificate Of Achievement

<img width="1228" alt="boa-certificate" src="https://github.com/cskang0121/bank-of-america-code-to-connect-2023-ficc-hackathon/assets/79074359/4570eb54-a73d-425c-901a-6a507a07623e">
