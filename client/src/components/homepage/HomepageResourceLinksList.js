//list out all of the links
import React, { useContext, useEffect } from "react"
import { HomepageContext } from "../../providers/HomepageProvider"
import HomepageResourceLinksCard from './HomepageResourceLinksCard'
import { Col, Row, Container } from 'reactstrap';

const HelpfulResourceList = () => {
    const { homepageResourceLinks, getResourceLinks } = useContext(HomepageContext);

    useEffect(() => {
        //debugger;
        getResourceLinks().then(() => console.log(homepageResourceLinks))

    }, []);


    return (

        <Container>
            <Row>
                <Col xs="8" className="container">
                    <div className="row justify-content-center">
                        <div className="cards-column">

                            <h1 >Helpful Links/ Getting Started</h1>

                            {homepageResourceLinks.map((link) => {
                                return <HomepageResourceLinksCard key={link.id} link={link} />
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

    )

}

export default HelpfulResourceList;