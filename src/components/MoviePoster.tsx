import type {Movie} from "../models/Movie.ts";
import {Icon56LogoVk} from "@vkontakte/icons";
import type {CSSProperties} from "react";
import {Footnote} from "@vkontakte/vkui";

export interface MoviePosterProps {
    movie: Movie,
    style?: CSSProperties
}

export const MoviePoster = (props: MoviePosterProps) => {
    const {
        movie: {
            poster,
            ageRating
        },
        style
    } = props

    return <div style={{
        aspectRatio: '300 / 450',
        background: 'var(--vkui--color_background_content_alpha)',
        position: 'relative',
        ...style
    }}>
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'var(--vkui--color_icon_primary_invariably)',
            }}
        >
            <Icon56LogoVk/>
        </div>

        <img src={poster?.previewUrl} alt="" style={{
            aspectRatio: '300 / 450',
            width: "100%",
            opacity: 0,
            position: 'absolute',
        }} onLoad={(it) => {
            it.currentTarget.style.opacity = '1'
        }}/>

        {ageRating&&<Footnote
            caps
            style={{
                position: 'absolute',
                top: 5,
                right: 5,
                padding: "4px 6px",
                borderRadius: 4,
                background: 'var(--vkui--color_icon_primary_invariably)',
            }}
        >
            {ageRating}+
        </Footnote>}
    </div>
}