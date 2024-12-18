> Why do I have a folder named ".expo" in my project?
The ".expo" folder is created when an Expo project is started using "expo start" command.
> What do the files contain?
- "devices.json": contains information about devices that have recently opened this project. This is used to populate the "Development sessions" list in your development builds.
- "settings.json": contains the server configuration that is used to serve the application manifest.
> Should I commit the ".expo" folder?
No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.
Upon project creation, the ".expo" folder is already added to your ".gitignore" file.

# Recipe App with Meal Categories

A mobile app built with React Native, allowing users to browse recipes by categories, sort them based on preferences, and mark their favorites for easy access later. The app integrates the Spoonacular API to fetch recipe data and uses `AsyncStorage` for storing user preferences persistently.

## Features

- **Browse by Categories**: Users can select categories such as breakfast, lunch, dinner, and more.
- **Sort Recipes**: Users can sort the recipes within a category based on predefined criteria, like "Most Popular" or user preferences.
- **Favorites**: Users can mark recipes as favorites. These preferences are saved locally using `AsyncStorage`.
- **Responsive UI**: The app is optimized for different screen sizes using `react-native-responsive-screen`.

## Technologies Used

- **React Native**: For building cross-platform mobile applications.
- **Expo**: To streamline development and testing.
- **Spoonacular API**: For fetching recipe data based on user-selected categories.
- **AsyncStorage**: For storing user preferences, such as category selections and favorite recipes.
- **React Navigation**: For navigating between different screens.

## Project Structure

- **/components/**: Contains React Native components like `Categories.js`, `Destinations.js`, `SortCategories.js`.
- **/assets/**: Stores image assets used in categories.
- **/constants/**: Contains constant data, such as available categories and sorting options.
- **/theme/**: Stores the custom theme configuration used for styling.
- **App.js**: The main entry point of the app, where navigation is configured.
- **package.json**: Manages dependencies and scripts for the project.

## Installation

Follow these steps to set up and run the app:

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <project-directory>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    expo install
    ```

3. **Start the app:**

    ```bash
    npx expo start
    ```

    This will start the Expo development server. You can open the app in your mobile device using the Expo Go app or in an emulator.

## Usage

1. **Browse Categories**: Select a category from the top and view a list of recipes for that category.
2. **Sort Recipes**: Sort recipes within the selected category based on predefined criteria or your own preference.
3. **Favorites**: Mark recipes as favorites to save them for easy access later. Your favorites are saved locally and are accessible even after restarting the app.


## Future Improvements

- **Search Functionality**: Allow users to search for specific recipes within categories.
- **User Authentication**: Implement login functionality to allow users to save and sync preferences across devices.
- **Additional Categories**: Include more categories and advanced sorting features.

## Next Steps
In future phases, we plan to:
    Different user account will display there own saving favorite and which recipe they like.
