export class Shape {

    public static setBackground(color, ctx, width, height) {
        ctx.fillStyle = color;
        ctx.rect(0, 0, width, height);
        ctx.fill('evenodd');
    }
}