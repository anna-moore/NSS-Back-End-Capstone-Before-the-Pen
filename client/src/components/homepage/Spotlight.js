//this component will get the spotlight from the provider and display the spotlight
//must have nested if clause for the items that are nullable

//list out all of the links
import React, { useContext, useEffect, useState } from "react";
import { HomepageContext } from "../../providers/HomepageProvider";
import HomepageResourceLinksCard from './HomepageResourceLinksCard';
import { Col, Row, Container, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import "../../App.css";
import YoutubeEmbed from "./SpotlightVideo";

export const SpotLightListCard = () => {
    const { getSpotlight, setSpotlight, spotlight } = useContext(HomepageContext);

    useEffect(() => {
        getSpotlight();
    }, []);


    //this card will have 
    //title of current Month 's Spotlight ⛅ 
    // artist name with a link to their portfolio ⛅ 
    //an optional video of their layout ⛅ 
    //or image made with an imageURL their layout⛅ 
    //the about section blur ⛅ 
    //style to flex the video or the image to the left and the other content to the right 
    //adjust the margin 

    {
        comments.length > 0 ?
            (comments.map((comment) => {
                return <CommentCard key={comment.id} comment={comment} commentState={commentState} />
            })
            ) : (
                <span style={{ marginTop: "30px" }}>No comments on this post.</span>
            )
    }
    return (

        <Container>
            <Card className="m-4">
                <CardBody>
                    <CardTitle>May's Spotlight</CardTitle>
                    <CardSubtitle><a href={spotlight.artistPortfolioURL}>{spotlight.name}</a></CardSubtitle>
                    <CardText>{spotlight.about}</CardText>
                    {/* this is where I have a ternary with the image or the video 
                        if spotlight.youtubeEmbedId does not equal null then display the video
                        if {above} does equal null than display spotlight.imageURL*/}
                    {
                        spotlight.youtubeEmbedId != null ?
                            (<div className="App">
                                <h1>Youtube Embed</h1>
                                <YoutubeEmbed embedId={spotlight.youtubeEmbedId} />
                            </div>)
                            :
                            (<img
                                src={spotlight.imageURL}
                                style={{ maxWidth: '800px', maxHeight: '600px' }}
                                className="rounded mx-auto d-block img-fluid"
                                alt="random picture probably not relating to the post"
                            />
                            )
                    }

                    <div>

                    </div>
                    <div className="float-right">

                        {' '}
                    </div>
                </CardBody>
            </Card>
        </Container>

    )

}

export default SpotLightListCard;