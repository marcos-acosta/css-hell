function combineClassNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export {
    combineClassNames
}