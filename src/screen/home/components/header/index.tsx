import { useContext } from "react";
import { Container, Icons, Options, Title } from "./styles";

import { TouchableOpacity } from "react-native";
import { ThemeContext, ThemeType } from "../../../../theme/theme";



export const Header = () => {
  const { toggleTheme, theme } = useContext(ThemeContext)
  const ICONSIZE = 26
  const isDarkMode = theme === ThemeType.dark
  // const theme = useColorScheme()
  return (<>
    <Container>
      <Title>Munchkins</Title>
      <Title></Title>
      <Options>
        <TouchableOpacity>
          <Icons name="backup-restore" size={ICONSIZE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icons name="pencil" size={ICONSIZE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icons name="dice-multiple" size={ICONSIZE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icons name="cog" size={ICONSIZE} />
        </TouchableOpacity>
      </Options>
    </Container>
  </>
  )
}
