import styled from "styled-components/native";

export const Header = styled.View`
    width: 100%;
    height: 100px;
    background-color: ${(props) => props.theme.colors.header};
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-around;
`
export const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.text};
    padding-bottom: 10px;
`

export const Options = styled.View`
    flex: 0.5;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    padding: 0 10px;
    padding-bottom: 10px;
`
