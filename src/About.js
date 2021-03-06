import React from 'react'
import { Container, Row, Col, Image} from 'react-bootstrap'
import {PaypalDonate} from './components/PaypalDonate';
import Text from './components/Text'


export const About = () => (
        <React.Fragment>
            <Container>
                <Row>
                    <Col xs={12}>
                    <header className="text-center">
                        <h1 className="font-weight-bold text-white">Hi, I'm JD Rudie.</h1>
                    </header>
                    </Col>
 
                </Row>
                <Row>
                    <Col>
                        <Text>
                            <Image src="https://i.pinimg.com/originals/10/71/a6/1071a68d76b0673337b84c84d37c8100.gif" className="float-md-left" alt="Old school computer">
                            </Image>
                            <p>I am a junior Mathematics and Computer Science student at Miami University in Oxford, Ohio. I intern at Wolfram Research in the Enterprise Data Analysis department.</p>
                            <p>I've been enthusiastic about music my whole life. Some of my all time favorites are David Bowie, Run The Jewels, Sufjan Stevens, MF DOOM, OutKast, Parquet Courts, Deafheaven, Megadeth, and Fiona Apple. </p>
                            <p>My social media is linked below just in case you're feeling like donating some clout. I also greatly appreciate PayPal donos since I'm a struggling college student.</p>
                        </Text>
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
				<a href="https://instagram.com/jd_rude">
                        		<Image src="insta.svg" width="120" height="120" alt="My Instagram"></Image>
                        	</a>
			</Col>
                </Row>
                <Row className="d-flex justify-content-center mt-5">
                    <PaypalDonate />
                </Row>
            </Container>
        </React.Fragment>
)  
