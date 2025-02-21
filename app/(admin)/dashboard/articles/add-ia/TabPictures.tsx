import React from 'react';
import Image from 'next/image';
import { assets } from '@/components/ui/assets/assets';

const TabPictures = ({ activeTab, image, setImage }) => {
    return (
        <div className={`mb-5 ${activeTab === 'tabPictures' ? '' : 'hidden'}`} id='tabPictures'>
            <div className="flex flex-col z-0 w-full mb-5 group text-center items-center">
                <label htmlFor="image">
                    {/* <Image
                        className="mt-4"
                        src={image ? URL.createObjectURL(image) : assets.upload_area}
                        alt=""
                        width={image ? 400 : 100}
                        height={image ? 300 : 145}
                    /> */}

<Image
    className="mt-4"
    src={image ? (image instanceof Blob ? URL.createObjectURL(image) : image) : assets.upload_area}
    alt=""
    width={image ? 400 : 100}
    height={image ? 300 : 145}
/>
                </label>
                <input
                    onChange={(event) => setImage(event.target.files[0])}
                    type="file"
                    id="image"
                    name="image"
                    hidden
                />
            </div>
        </div>
    );
};

export default TabPictures;