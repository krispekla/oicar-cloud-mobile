import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import FunctionScreen from "../screens/FunctionScreen";
import VMScreen from "../screens/VMScreen";
import SqlScreen from "../screens/SqlScreen";

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  Calculator: CalculatorScreen,
  Function: FunctionScreen,
  VM: VMScreen,
  SQL: SqlScreen,
});

export default createAppContainer(AppNavigator);
