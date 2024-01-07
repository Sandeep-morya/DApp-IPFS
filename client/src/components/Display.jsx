/* eslint-disable react/prop-types */
// import React from 'react'

import { useState } from "react"
import { PINATA_IMAGE } from "../utils/constants";

const Display = ({ contract }) => {
    const [hashes, setHashes] = useState([]);

    const getData = async () => {
        const res = await contract.showImages();
        console.log(res);
        setHashes(Array.from(res));
    }

    return (
        <div>Display
            <button className="block bg-black px-6 py-4 text-white" onClick={getData}>Show Hashes</button>
            <section>
                <h1 className="text-xl font-bold">Uploded Images</h1>
                <article className="flex flex-wrap gap-5">
                    {hashes.map(hash => <img className="w-48 object-cover" key={hash} src={PINATA_IMAGE + hash} />)}
                </article>
            </section>
        </div>
    )
}

export default Display