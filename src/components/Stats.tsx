import styled from 'styled-components';
import { motion } from 'framer-motion';
const Section=styled.section`padding:0 16px; margin-top:-38px; position:relative; z-index:4;`;
const Grid=styled.div`width:min(100%,1100px); margin:auto; display:grid; grid-template-columns:repeat(2,1fr); gap:12px; @media(min-width:${({theme})=>theme.breakpoints.mobile}){grid-template-columns:repeat(4,1fr)}`;
const Card=styled(motion.div)`padding:23px 12px; text-align:center; background:rgba(255,255,255,.9); backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,.9); border-radius:${({theme})=>theme.radius.md}; box-shadow:${({theme})=>theme.shadows.card};`;
const Value=styled.div`font-size:clamp(1.7rem,4vw,2.35rem); font-weight:900; background:${({theme})=>theme.gradients.fire}; -webkit-background-clip:text; color:transparent;`;
const Label=styled.div`margin-top:5px; font-size:.68rem; letter-spacing:.075em; color:${({theme})=>theme.colors.muted}; font-weight:800;`;
const data=[['08+','YEARS TRAINING'],['30+','PULL UPS'],['15+','MUSCLE UPS'],['60 SEC','HANDSTAND']];
export const Stats=()=> <Section><Grid>{data.map(([value,label],i)=><Card key={label} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><Value>{value}</Value><Label>{label}</Label></Card>)}</Grid></Section>;
