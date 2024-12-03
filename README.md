> Why do I have a folder named ".expo" in my project?
The ".expo" folder is created when an Expo project is started using "expo start" command.
> What do the files contain?
- "devices.json": contains information about devices that have recently opened this project. This is used to populate the "Development sessions" list in your development builds.
- "settings.json": contains the server configuration that is used to serve the application manifest.
> Should I commit the ".expo" folder?
No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.
Upon project creation, the ".expo" folder is already added to your ".gitignore" file.

>Recipe App with Meal Categories
This is a recipe app built with React Native using Expo. The app allows users to browse different recipe categories, view detailed recipes, and 
filter them based on various preferences. The project uses Spoonacular API to fetch recipe data and stores user preferences locally using 
AsyncStorage.

>Project Overview
This Recipe App with Meal Categories is a mobile application built using React Native, which allows users to explore various recipes organized 
by meal categories. The app integrates with the Spoonacular API to fetch recipe data and provides functionality to browse, sort, and view 
detailed recipe information.

>Features:

    Meal Categories: Explore different meal categories such as Main Course, Dessert, Side Dish, etc.
    Recipe Sorting: Sort recipes based on categories like "All", "Most Popular", and "Saved List".
    Recipe Details: View detailed information about each recipe, including ingredients, steps, and nutrition facts.
    Responsive UI: The app is designed to be responsive, providing a smooth experience on both phones and tablets.

>Project Setup
Follow these instructions to get the project up and running on your local machine.

    >Prerequisites
    Before you begin, ensure that you have the following installed:
    
    Node.js: Download and install from Node.js Official Website
    Expo CLI: Install Expo CLI by running the following command in your terminal: npm install -g expo-cli
    Git (Optional): To clone the repository, if needed.

>Steps to Set Up the Project
    Clone the repository: Clone the repository to your local machine using Git
 
    Install dependencies: Navigate to the project folder and install all dependencies: npm install

    Install Expo: expo install

    Set up Spoonacular API key:
        Obtain your Spoonacular API key by registering at Spoonacular API.
        Add your API key in the Constants.js file, which is located in the src/constants/ folder:
        export const API_KEY = 'YOUR_SPOONACULAR_API_KEY'; 
        Start the app: Use Expo CLI to run the app: npx expo start
    This will open a window in your browser. Scan the QR code using the Expo Go app on your mobile device to view the app, or use an emulator 
    to test it.

>Explanation of Key Folders and Files
    components/
    Contains reusable UI components that are used throughout the app.
    Categories: Displays different categories of recipes (e.g., Main Course, Dessert, Salad).
    Destinations: Displays a list of recipes or destinations with detailed information.
    SortCategories: Handles sorting the displayed recipes based on user preference.
    
    constants/
    Contains constant data used across the application.
    categoriesData: Array of category objects with titles and images for different recipe categories.
    destinationData: Example data for destinations or recipes, including details like title, price, duration, and image.
    sortCategoryData: Defines the different sorting options available for the recipes.
    API_KEY: The Spoonacular API key used to fetch recipe data.
    
    navigation/
    Contains the navigation setup for the app using React Navigation.
    AppNavigation.js: Defines the stack navigator for navigating between screens (e.g., Home, Welcome, Destination, Login).
    
    screens/
    Contains the main screens of the app.
    HomeScreen: The main screen that displays categories and recipes.
    WelcomeScreen: The welcome screen presented when the app starts.
    DestinationScreen: Displays detailed information about a specific recipe or destination.
    LoginScreen: Allows users to log in to the app.
    
    assets/
    Contains images used in the app, such as category images.
    
    App.js
    The entry point of the application that sets up the main navigation and wraps the app in a navigation container.
    
    theme.js
    Contains the theme settings for the app, including color schemes and other style-related configurations.

>Next Steps
In future phases, we plan to:
    Implement a user authentication system. 
    Add functionality for saving favorite recipes and like button.
    Different user account will display there own saving favorite and which recipe they like.
