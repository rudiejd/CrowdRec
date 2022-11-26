import React from 'react'
import { Container, Row, Col, Image} from 'react-bootstrap'
import ViewWidthText from './components/Text'


export const About = () => (
        <React.Fragment>
            <Container className="m-2">
                <Row>
                    <Col>
                        <ViewWidthText viewSize={2}>
                            <Image src="https://i.pinimg.com/originals/10/71/a6/1071a68d76b0673337b84c84d37c8100.gif" className="float-md-left" alt="Old school computer">
                            </Image>
                            <p>Hi, I'm JD. I've been enthusiastic about music my whole life. Some of my all time favorites are Black Country, New Road, The Microphones, Car Seat Headrest, David Bowie, Run The Jewels, Sufjan Stevens, MF DOOM, OutKast, Parquet Courts, Deafheaven, Megadeth, and Fiona Apple. </p>
                        </ViewWidthText>
                  </Col>
                </Row>
                <Row className="mt-lg-5">

                        <Col lg={4} align="center">
                            	<a href="https://github.com/rudiejd">
					<Image src="github.png" alt="My GitHub"></Image>
				</a>
                        </Col>
                        <Col align="center">
				<a href="https://open.spotify.com/user/rudebowski">
                        		<Image src="spotify.svg" width="120" height="120" alt="My Spotify"></Image>
                        	</a>
			</Col>
                        <Col align="center">
				<a href="https://instagram.com/jd_rolite">
                        		<Image src="insta.svg" width="120" height="120" alt="My Instagram"></Image>
                        	</a>
			</Col>
                </Row>
            </Container>
        </React.Fragment>
)  
