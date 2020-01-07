import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/main';
import Product from './pages/product';

const rootStack = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: 'JSHunt',
      headerStyle: {
        backgroundColor: "#DA552F"
      },
      headerTintColor: "#FFFFFF"
    }
  },
  Product: {
    screen: Product,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#DA552F"
      },
      headerTintColor: "#FFFFFF"
    }
  }
});

const App = createAppContainer(rootStack);

export default App;