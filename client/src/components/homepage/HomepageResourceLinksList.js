//list out all of the links
import React, { useContext, useEffect } from "react"
import { HomepageContext } from "../../providers/HomepageProvider"
import HomepageResourceLinksCard from './HomepageResourceLinksCard'
import { Col, Row, Container, Card, CardTitle } from 'reactstrap';

const HelpfulResourceList = () => {
    const { homepageResourceLinks, getResourceLinks } = useContext(HomepageContext);

    useEffect(() => {
        getResourceLinks().then(() => console.log(homepageResourceLinks))

    }, []);


    return (

        <Container>
            {/* <Card> */}

            <Row>
                <Col s="8" className="container">
                    <div className="row">
                        <div className="cards-column pt-5">
                            <CardTitle className="h1">Helpful Links</CardTitle>
                            {homepageResourceLinks.map((link) => {
                                return <HomepageResourceLinksCard key={link.id} link={link} />
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
            {/* </Card> */}
        </Container>

    )

}

export default HelpfulResourceList;