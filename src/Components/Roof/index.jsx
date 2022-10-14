import React, {useEffect, useState, useRef} from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

const Roof = ({roofType, setIsMoving}) => {

const { nodes, materials } = useGLTF('assets/roof.glb');
const roof_1 = useRef();
const roof_2 = useRef();

const setMovingState = (type) => {
    setIsMoving(type);
}

useEffect(() => {
    if( roofType === 'type_2') {
        gsap.to(roof_1.current.position, {
            onStart: () => {
                setMovingState(true);
            },
            duration: 1,
            y: 6,
            onComplete: () => {
                gsap.to(roof_2.current.position, {
                duration: 1,
                y: 1.05,
                onComplete: ()=>{
                    setMovingState(false);
                }
                })
            }
        });
    } else if ( roofType === 'type_1' ) {
        gsap.to(roof_2.current.position, {
            duration: 1,
            onStart: () => {
                setMovingState(true);
            },
            y: 6,
            onComplete: () => {
                gsap.to(roof_1.current.position, {
                duration: 1,
                y: 1.05,
                onComplete: ()=>{
                    setMovingState(false);
                }
                })
            }
        });
    }
}, [roofType])

  return (
    <>
        <mesh ref={roof_1} receiveShadow geometry={nodes.roof_1.geometry} material={materials.wall} position={[0,1.05,0]} /> 
        <mesh ref={roof_2} receiveShadow geometry={nodes.roof_2.geometry} material={materials.block} position={[0,6,0]} />
    </>
  )
}

export default Roof;