import React, {useState} from 'react'
import Video from '../../videos/video.mp4'
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight} from './HeroElements'
import { Button } from '../ButtonElement'

const HeroSection = () => {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    const handleClick = () => {
        window.location.href = '/HTML/signup.html'
      }

  return (
    <HeroContainer id='home'>
        <HeroBg>
            <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
        </HeroBg>
        <HeroContent>
            <HeroH1>Delivery Made Easy</HeroH1>
            <HeroP>Sign up for a new account today!</HeroP>
            <HeroBtnWrapper>
                <Button onClick={handleClick} onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark="true" smooth={true} duration={500} spy={true} exact='true' offset={-80} style={{textDecoration: 'none'}}>
                    Get Started {hover ? <ArrowForward /> : <ArrowRight />}
                </Button>
            </HeroBtnWrapper>
        </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection