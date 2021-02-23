export function dateTransform(input: string) {
    const len = input.length - 1;
    const unit = input[len];
    const val = parseInt(input.substr(0, len));
    const mewDate = new Date();
    switch (unit) {
        case 'd':
            return new Date(mewDate.setDate(mewDate.getDate() + val))
        case 'm':
            return new Date(mewDate.setMinutes(mewDate.getMinutes() + val))
    }
}