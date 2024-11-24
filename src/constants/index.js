// Sorting categories for filtering recipes
export const sortCategoryData = ['All', 'Most Popular', 'Saved List'];

// Your Spoonacular API Key for making requests to fetch recipe data
export const API_KEY = '061bbe08630a73855563c7654fc3001187636eaa'; // Replace with your actual API key


// Array of categories with title and image for each category of recipes
export const categoriesData = [
    {
        title: 'Main Course', // Category name
        image: require('../../assets/images/ocean.png') // Image for the category
    },
    {
        title: 'Side Dish',
        image: require('../../assets/images/mountain.png')
    },
    {
        title: 'Dessert',
        image: require('../../assets/images/camp.png')
    },
    {
        title: 'Appetizer',
        image: require('../../assets/images/sunset.png')
    },
    {
        title: 'Salad',
        image: require('../../assets/images/hiking.png')
    },
    {
        title: 'Bread',
        image: require('../../assets/images/beach.png')
    },
    {
        title: 'Breakfast',
        image: require('../../assets/images/forest.png')
    },
    {
        title: 'Soup',
        image: require('../../assets/images/ocean.png')
    },
    {
        title: 'Beverage',
        image: require('../../assets/images/mountain.png')
    },
    {
        title: 'Sauce',
        image: require('../../assets/images/camp.png')
    },
    {
        title: 'Marinade',
        image: require('../../assets/images/sunset.png')
    },
    {
        title: 'Fingerfood',
        image: require('../../assets/images/hiking.png')
    },
    {
        title: 'Snack',
        image: require('../../assets/images/beach.png')
    },
    {
        title: 'Drink',
        image: require('../../assets/images/forest.png')
    },
];

// Example data for destinations (could be recipes or places in your app)
export const destinationData = [
    {
        title: 'Miniature Fruit Tarts', // Title of the recipe or destination
        duration: '12 Days', // Duration of the recipe or trip
        distance: '400 KM', // Distance (if applicable)
        weather: '20 C', // Weather conditions (if applicable)
        price: 88.96, // Price of the recipe or destination
        shortDescription: "Miniature Fruit Tarts takes approximately.", // Short description
        longDescription: "Osaka Castle is a Japanese castle in Chūō-ku, Osaka, Japan. The castle is one of Japan's most famous landmarks and it played a major role in the unification of Japan during the sixteenth century of the Azuchi-Momoyama period.", // Detailed description
        image: { uri: 'https://img.spoonacular.com/recipes/651994-312x231.jpg' } // Image URI for the recipe or destination
    },
    {
        title: 'Panna Cotta with Raspberry and Orange Sauce',
        duration: '7 Days',
        distance: '450 KM',
        weather: '30 C',
        price: 143.08,
        shortDescription: "Panna Cotta with Raspberry and Orange Sauce is a dessert that serves 6.",
        longDescription: "Itsukushima Shrine is a Shinto shrine on the island of Itsukushima, best known for its 'floating' torii gate. It is in the city of Hatsukaichi in Hiroshima Prefecture in Japan, accessible from the mainland by ferry at Miyajimaguchi Station.",
        image: { uri: 'https://img.spoonacular.com/recipes/654571-312x231.jpg' }
    },
    {
        title: 'Yogurt Mousse With Raspberry Sauce',
        duration: '5 Days',
        distance: '299 KM',
        weather: '14 C',
        price: 313.33,
        shortDescription: "Yogurt Mousse With Raspberry Sauce requires roughly 45 minutes from start to finish.",
        longDescription: "Babusar Pass or Babusar Top is a mountain pass in Pakistan at the north of the 150 km long Kaghan Valley, connecting it via the Thak Nala with Chilas on the Karakoram Highway. It is the highest point in Kaghan Valley that can be easily accessed by cars.",
        image: { uri: 'https://img.spoonacular.com/recipes/665553-312x231.jpg' }
    },
    {
        title: 'Orange Honey Madeleines',
        duration: '20 Days',
        distance: '604 KM',
        weather: '34 C',
        price: 10.32,
        shortDescription: "Orange Honey Madeleines could be just the lacto ovo vegetarian</b> recipe you've been looking for.",
        longDescription: "Tōdai-ji is a Buddhist temple complex that was once one of the powerful Seven Great Temples, located in the city of Nara, Japan. Though it was originally founded in the year 738 CE, Tōdai-ji was not opened until the year 752 CE.",
        image: { uri: 'https://img.spoonacular.com/recipes/653886-312x231.jpg' }
    },
];
