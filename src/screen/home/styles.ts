import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
    padding:0 15px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.text};
    padding-bottom: 10px;
`
export const Circle = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: ${(props) => props.theme.colors.header};
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 15px 15px 0px;
    /* transform: rotate(90deg); */
`

export const CircleTitle = styled.Text`
    font-size: 20px;
    position: absolute;
`;
