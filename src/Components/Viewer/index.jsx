import React, {useState} from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Roof from '../Roof';
import './style.css'

const Viewer = () => {
  const { scene } = useGLTF('assets/main.glb');
  const [roofType, setRoofType] = useState('');
  var isMoving = false;

const setIsMoving = (isMovingState) => {
    isMoving = isMovingState;
}

  return (
    <>
        <Canvas shadows style={{ width: '100%', height: '100vh', position: 'inherit' }}>
            <OrbitControls minDistance={3.5} maxDistance={5.5} minPolarAngle={10 * Math.PI / 30} maxPolarAngle={15 * Math.PI / 30} />
            <ambientLight intensity={1} position={[0,1,0]}/>
            <primitive object={scene}>
                <mesh />
            </primitive>
            <Roof setIsMoving={setIsMoving} roofType={roofType}/>
        </Canvas>
        <div className='buttons'>
            <div className='button' onClick={()=>{if(isMoving === false) setRoofType('type_1')}} >roof_1</div>
            <div className='button' onClick={()=>{if(isMoving === false) setRoofType('type_2')}} >roof_2</div>
        </div>
    </>
  )
}

export default Viewer;

useGLTF.preload('assets/main.glb');