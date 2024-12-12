import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
// import { Perf } from 'r3f-perf';
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'


const torusGeometry = new THREE.TorusGeometry(2, 0.6, 16, 12)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    const donuts = useRef([])

    const [ matcapTexture ] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

    useFrame((state, delta) =>
    {
        for(const donut of donuts.current)
        {
            donut.rotation.y += delta * 0.2
        }
    })

    useEffect(() =>
    {
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    return <>




        {/* <Perf position="top-left" /> */}

        <OrbitControls 
            makeDefault 
            minPolarAngle={Math.PI / 4} 
            //maxPolarAngle={Math.PI / 1.5}
            //minAzimuthAngle={-Math.PI / 4}
            //maxAzimuthAngle={Math.PI / 1.75} 
            enablePan={false} 
            enableZoom={false} 
            enableDamping={true} // Enable damping for smooth transitions
            dampingFactor={0.10} // Adjust damping factor for slower, smoother motion
            rotateSpeed={.2} // Slow down rotation speed
        />

        <Center position={[-.5, 3, -1.5]} rotation={[0, Math.PI * 0.25, 0]}>

            <Text3D
                material={ material }
                font="./fonts/helvetiker_regular.typeface.json"
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                WHOLESALE COFFEE
            </Text3D>

        </Center>

        { [...Array(100)].map((value, index) =>
            <mesh
                ref={ (element) => donuts.current[index] = element }
                key={ index }
                geometry={ torusGeometry }
                material={ material }
                position={ [
                    (Math.random() - 0.5) * 23,
                    (Math.random() - 0.5) * 16,
                    (Math.random() - 0.5) * 19
                ] }
                scale={ 0.2 + Math.random() * 0.2 }
                rotation={ [
                    0,
                    Math.PI * 0.15 + (Math.random() * Math.PI),
                    0
                ] }
            />
        ) }

    </>
}