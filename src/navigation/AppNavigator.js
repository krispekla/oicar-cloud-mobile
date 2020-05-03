import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CalculatorScreen from "../screens/CalculatorScreen";

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  Calculator: CalculatorScreen,
});

export default createAppContainer(AppNavigator);
