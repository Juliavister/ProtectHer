
import React from "react";
import {
	Box,
	FooterContainer,
	Row,
	Column,
	FooterLink,
	Heading,
} from "./FooterStyles";

const Footer = () => {
	return (
		<Box>
			<h1 style={{color: "pink", textAlign: "center", marginTop: "10px", }} > Thank you for using ProtectHer! </h1>
			<FooterContainer>
				<Row>
					<Column>
						<Heading>About us</Heading>
						<FooterLink href="#">
							Aim
						</FooterLink>
						<FooterLink href="#">
							
						</FooterLink>
					</Column>

					<Column>
						<Heading>Services</Heading>
						<FooterLink href="https://www.linkedin.com/company/creatialabs/">
                            CREATI·A Labs
						</FooterLink>
						<FooterLink href="#">
						</FooterLink>
					</Column>

					<Column>
						<Heading>Contact Us</Heading>
						<FooterLink href="https://www.linkedin.com/in/julia-vister-a6756b22b/">
							Julia Vister
						</FooterLink>
						<FooterLink href="https://www.linkedin.com/in/doga-kurtoglu/">
							Doga Kurtoglu 
						</FooterLink>
						<FooterLink href="https://www.linkedin.com/in/mpienkosz/">
							Mikolaj Pienkosz
						</FooterLink>
					</Column>

					<Column>
						<Heading>Social Media</Heading>
						<FooterLink href="https://twitter.com/creatiaresearch">
							<i className="fab fa-twitter">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Twitter
								</span>
							</i>
						</FooterLink>
						<FooterLink href="https://www.linkedin.com/company/creatialabs/">
							<i className="fab fa-linkedin">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Linkedin
								</span>
							</i>
						</FooterLink>
					</Column>
				</Row>
			</FooterContainer>
		</Box>
	);
};
export default Footer;
