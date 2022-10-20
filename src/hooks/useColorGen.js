// eslint-disable-next-line prettier/prettier

export default function useColorGen() {
    const colorGenerator = () => {
        const hue = Math.floor(Math.random() * 360);
        const color = `hsla(${hue}, 100%, 40%, 1)`;
        const bgColor = `hsla(${hue}, 100%, 90%, 1)`;
        return { color, bgColor };
    };

    return colorGenerator;
}
