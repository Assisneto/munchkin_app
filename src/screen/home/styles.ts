import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
    padding:0 15px;
    padding-top: 15px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.text};
    padding-bottom: 10px;
`
