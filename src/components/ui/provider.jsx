
import { ChakraProvider} from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import { system } from "../../data/chakraTheme";

export function Provider(props) {
  // console.log("System:", system);
  return (
    <ChakraProvider value={system} >
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
