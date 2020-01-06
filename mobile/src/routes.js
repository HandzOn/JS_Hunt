import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/main';

const rootStack = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: 'JSHunt',
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center'
      }
    }
  }
});

const App = createAppContainer(rootStack);

export default App;