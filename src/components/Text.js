import styled from 'styled-components';

const ViewWidthText = styled.div(
    ({viewSize}) => `
        text-align: center;
        font-size: ${viewSize}vw;
    `);


export default ViewWidthText; 