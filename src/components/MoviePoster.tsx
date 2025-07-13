import type {Movie} from "../models/Movie.ts";
import {Icon56LogoVk} from "@vkontakte/icons";
import type {CSSProperties} from "react";

export interface MoviePosterProps {
    poster: Movie['poster']
    style?: CSSProperties
}

export const MoviePoster = (props: MoviePosterProps) => {
    const { poster, style } = props

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
    </div>
}