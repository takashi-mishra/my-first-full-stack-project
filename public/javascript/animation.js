let lt = gsap.timeline()
lt.from("#naruto",{
    y:-30,
    opacity:0,
    duration:1,
    delay:1
});


lt.from(".hlo",{
    y:-30,
    opacity:0,
    duration:0.5,
    delay:0.5
});
lt.from("#navbar .image", {
    y: -30,
    opacity: 0,
    duration: 0.5,// Shortened duration
    delay: 0.3, 
})

lt.from(".tab li", {
    y: -30,
    opacity: 0,
    duration: 0.5, // Shortened duration
     // Adjusted delay to start after image animation
    stagger: 0.3 // Reduced stagger
});

lt.from("#icon", {
    y: -30,
    opacity: 0,
    duration: 0.5, // Shortened duration
    delay: 0.5, // Adjusted delay to start after tab li animation
    // Reduced stagger
});




gsap.set(".hero-text .word", { display: "inline-block" });

        // Animation
        gsap.timeline()
            .to(".hero-text .word:nth-child(3)", { y: -30, duration: 0.5 })
            .to(".hero-text .word:nth-child(2)", { x: -60, duration: 0.5 }, "-=0.3")
            .to(".hero-text .word:nth-child(2)", { y: 30, duration: 0.5 })
            .to(".hero-text .word:nth-child(2)", { x: 10, duration: 0.5 }, "-=0.3");




gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('#profiles').forEach(profiles => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: profiles,
            start: "top center",
            end: "bottom center",
            scrub: 1
        }
    });

    tl.to(profiles.querySelectorAll(".line"), {
        opacity: 1,
        y: 0,
        duration: 3,
        stagger: 1
    });

    tl.from(profiles.querySelectorAll("#profiles img"), {
       
            y:-30,
            opacity:0,
            duration:3,
            delay:1,
             scale:2,
            
            
        
    });
});

