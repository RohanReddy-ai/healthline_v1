"use client";

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X, Phone, Users, Clock, AlertTriangle, Target, TrendingUp, Heart, CheckCircle, Lock, Zap } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, Variants } from 'framer-motion'
import { WavyBackground } from '@/components/ui/wavy-background'
import { GridItem } from '@/components/ui/glowing-effect'
import { AnimatedIcon } from '@/components/ui/animated-icon'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { AnimatedCounter } from '@/components/ui/animated-counter'

// cn function (utility)
function cn(...inputs: (string | undefined | null | boolean)[]) {
    return inputs.filter(Boolean).join(' ')
}

// Button component (from shadcn/ui)
const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                gradient: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl transform',
                'gradient-professional': 'bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-blue-700 hover:to-sky-600 hover:scale-105 hover:shadow-xl transform',
                'gradient-success': 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 hover:shadow-xl transform',
                'gradient-secondary': 'bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 hover:scale-105 hover:shadow-xl transform',
                'gradient-accent': 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 hover:scale-105 hover:shadow-xl transform animated-gradient',
                glass: 'glass-morphism text-gray-900 hover:bg-white/20 hover:scale-105 hover:shadow-xl transform backdrop-blur-md',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        if (asChild) {
            return (
                <div
                    className={cn(buttonVariants({ variant, size, className }))}
                    {...(props as React.HTMLAttributes<HTMLDivElement>)}
                >
                    {props.children}
                </div>
            )
        }
        
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)
Button.displayName = 'Button'

// AnimatedGroup component
type PresetType =
    | 'fade'
    | 'slide'
    | 'scale'
    | 'blur'
    | 'blur-slide'
    | 'zoom'
    | 'flip'
    | 'bounce'
    | 'rotate'
    | 'swing';

type AnimatedGroupProps = {
    children: React.ReactNode;
    className?: string;
    variants?: {
        container?: Variants;
        item?: Variants;
    };
    preset?: PresetType;
};

const defaultContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const defaultItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const presetVariants: Record<
    PresetType,
    { container: Variants; item: Variants }
> = {
    fade: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
    },
    slide: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        },
    },
    scale: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
        },
    },
    blur: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, filter: 'blur(4px)' },
            visible: { opacity: 1, filter: 'blur(0px)' },
        },
    },
    'blur-slide': {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, filter: 'blur(4px)', y: 20 },
            visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
        },
    },
    zoom: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, scale: 0.5 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
            },
        },
    },
    flip: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, rotateX: -90 },
            visible: {
                opacity: 1,
                rotateX: 0,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
            },
        },
    },
    bounce: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, y: -50 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
            },
        },
    },
    rotate: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, rotate: -180 },
            visible: {
                opacity: 1,
                rotate: 0,
                transition: { type: 'spring', stiffness: 200, damping: 15 },
            },
        },
    },
    swing: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, rotate: -10 },
            visible: {
                opacity: 1,
                rotate: 0,
                transition: { type: 'spring', stiffness: 300, damping: 8 },
            },
        },
    },
};

function AnimatedGroup({
    children,
    className,
    variants,
    preset,
}: AnimatedGroupProps) {
    const selectedVariants = preset
        ? presetVariants[preset]
        : { container: defaultContainerVariants, item: defaultItemVariants };
    const containerVariants = variants?.container || selectedVariants.container;
    const itemVariants = variants?.item || selectedVariants.item;

    return (
        <motion.div
            initial='hidden'
            animate='visible'
            variants={containerVariants}
            className={cn(className)}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div key={index} variants={itemVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HealthHeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden" style={{backgroundColor: '#ECEEF1'}}>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 0.3,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring' as const,
                                            bounce: 0.3,
                                            duration: 0.8,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <img
                                src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                                alt="background"
                                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                                width="3276"
                                height="4095"
                            />
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <Link
                                        href="/demo"
                                        className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                        <span className="text-foreground text-sm">Delivering Value Today</span>
                                        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                        
                                    {/* Main heading with wave background */}
                                    <div className="relative mt-8 lg:mt-16">
                                        {/* Wave background positioned behind heading - edge to edge */}
                                        <div className="absolute inset-0 flex items-center justify-center -z-10">
                                            <div className="absolute left-[-100vw] right-[-100vw] w-[200vw] h-64 translate-y-4">
                                                <WavyBackground 
                                                    backgroundFill="transparent"
                                                    waveWidth={3}
                                                    waveOpacity={0.25}
                                                    blur={4}
                                                    colors={["#2563EB", "#0EA5E9", "#059669", "#64748B", "#3B82F6", "#0284C7"]}
                                                    containerClassName="h-full w-full"
                                                >
                                                    <div></div>
                                                </WavyBackground>
                                            </div>
                                        </div>
                                        <h1 className="relative max-w-5xl mx-auto text-balance text-6xl md:text-7xl xl:text-[5.25rem] font-bold gradient-text-professional">
                                            AI Voice Assistants for a Smarter, More Efficient Practice
                                        </h1>
                                    </div>
                                    <p
                                        className="mx-auto mt-8 max-w-3xl text-balance text-lg text-muted-foreground">
                                        We build targeted voice AI solutions that automate routine tasks, save your practice money, and free up valuable staff time. No complex installations, just immediate impact.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.1,
                                                    delayChildren: 0.4,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div key={1}>
                                        <Button
                                            asChild
                                            size="lg"
                                            variant="gradient-professional"
                                            className="rounded-xl px-6 py-3 text-base font-semibold">
                                            <Link href="/demo" className="flex items-center gap-2">
                                                <AnimatedIcon animation="glow" size="sm" className="text-white"><Phone /></AnimatedIcon>
                                                <span className="text-nowrap">Try Our Demo</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="glass"
                                        className="h-10.5 rounded-xl px-5">
                                        <Link href="#solutions">
                                            <span className="text-nowrap">See Our Solutions</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        {/* Our Current Focus Section */}
                        <section className="py-20 bg-gradient-to-br from-blue-50 via-sky-50 to-slate-50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-sky-100/20"></div>
                            <div className="max-w-6xl mx-auto px-6 relative z-10">
                                <ScrollReveal direction="up" delay={0.2}>
                                    <div className="text-center mb-16">
                                        <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-6">Practical AI Automations for Primary Care</h2>
                                        <h3 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-8">Automated Sample Labeling Assistant</h3>
                                    </div>
                                </ScrollReveal>

                                {/* Automated Sample Labeling Assistant - Bento Grid Style */}
                                <ScrollReveal direction="up" delay={0.4}>
                                    <div className="mb-12">
                                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                                        <GridItem
                                            area="lg:col-span-1"
                                            variant="warning"
                                            icon={<AnimatedIcon animation="pulse" color="warning" size="md"><AlertTriangle /></AnimatedIcon>}
                                            title="The Challenge"
                                            description="Incorrectly labelled patient samples lead to rejected tests, wasted resources, and delays in care. Staff spend valuable time guiding patients through the process manually."
                                            className="min-h-[14rem]"
                                        />
                                        
                                        <GridItem
                                            area="lg:col-span-1"
                                            variant="accent"
                                            icon={<AnimatedIcon animation="float" color="accent" size="md"><Phone /></AnimatedIcon>}
                                            title="Our Solution"
                                            description="A simple, automated voice interface that patients can call. It provides clear, step-by-step instructions for correctly labeling their sample and placing it in the right location."
                                            className="min-h-[14rem]"
                                        />
                                        
                                        <GridItem
                                            area="lg:col-span-1"
                                            variant="success"
                                            icon={<AnimatedIcon animation="bounce" color="success" size="md"><TrendingUp /></AnimatedIcon>}
                                            title="The Impact"
                                            description={<>
                                                <div className="text-center mb-4">
                                                    <AnimatedCounter 
                                                        value={25000} 
                                                        prefix="£" 
                                                        duration={2.5}
                                                        className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1"
                                                    />
                                                    <p className="text-sm text-emerald-600">Annual savings per practice</p>
                                                </div>
                                                <p className="text-sm">Reduced errors, staff time savings, and faster patient care.</p>
                                            </>}
                                            className="min-h-[14rem]"
                                        />
                                        </ul>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </section>
                    </div>
                </section>
                

                {/* UK Primary Care Statistics Section - Bento Style */}
                <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100/15 via-transparent to-blue-100/15"></div>
                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <ScrollReveal direction="up" delay={0.1}>
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">Why Is This Necessary?</h2>
                                <h3 className="text-2xl font-semibold bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent mb-8">The Strain on UK Primary Care</h3>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.3}>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 list-none">
                            <GridItem
                                variant="warning"
                                icon={<AnimatedIcon animation="glow" color="warning" size="md"><Phone /></AnimatedIcon>}
                                title="15+ Million"
                                description="Patient calls to GP practices go unanswered each year in the UK"
                                className="min-h-[12rem]"
                            />
                            <GridItem
                                variant="accent"
                                icon={<AnimatedIcon animation="spin" color="accent" size="md"><Clock /></AnimatedIcon>}
                                title="30 Minutes"
                                description="The average time a patient can spend waiting in a phone queue"
                                className="min-h-[12rem]"
                            />
                            <GridItem
                                variant="secondary"
                                icon={<AnimatedIcon animation="float" color="secondary" size="md"><Users /></AnimatedIcon>}
                                title="32%"
                                description="of older adults are unable to navigate complex GP online booking systems"
                                className="min-h-[12rem]"
                            />
                            <GridItem
                                variant="success"
                                icon={<AnimatedIcon animation="pulse" color="success" size="md"><Heart /></AnimatedIcon>}
                                title="Burnout Crisis"
                                description="Receptionists facing high workloads and stressful environments are experiencing rising levels of burnout"
                                className="min-h-[12rem]"
                            />
                            </ul>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Technology Trust & Safety Section - Bento Style */}
                <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-indigo-100/20"></div>
                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold gradient-text-professional mb-6">Technology Built for Trust & Safety</h2>
                            <h3 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-8">Clinically-Led and Secure by Design</h3>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                            <GridItem
                                variant="success"
                                icon={<Heart className="h-5 w-5" />}
                                title="Human-like Empathy"
                                description="Our AI's responses have been rated as more empathetic than those of physicians, ensuring patients feel heard and understood."
                                className="min-h-[14rem]"
                            />
                            <GridItem
                                variant="accent"
                                icon={<Target className="h-5 w-5" />}
                                title="High Triage Accuracy"
                                description="In tests, our underlying technology correctly triaged 100% of critical neurosurgery emergency cases, demonstrating its reliability."
                                className="min-h-[14rem]"
                            />
                            <GridItem
                                variant="secondary"
                                icon={<Lock className="h-5 w-5" />}
                                title="Secure Integration"
                                description="We connect securely to NHS clinical systems (EMIS, SystmOne, Vision) using standard APIs, with a human-in-the-loop interface for staff oversight."
                                className="min-h-[14rem]"
                            />
                            <GridItem
                                variant="default"
                                icon={<CheckCircle className="h-5 w-5" />}
                                title="Gold-Standard Compliance"
                                description="Our solutions are built to meet the highest standards, including the NHS DSP Toolkit, UK GDPR, and the DCB0129/0160 clinical safety frameworks."
                                className="min-h-[14rem]"
                            />
                        </ul>
                    </div>
                </section>

                {/* Our Team Section */}
                <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100/15 via-transparent to-blue-100/15"></div>
                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold gradient-text-accent mb-6">Our Team</h2>
                            <h3 className="text-2xl font-semibold bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent mb-8">Built by a coalition of clinicians and innovators from</h3>
                        </div>
                        <div className="flex items-center justify-center gap-12 flex-wrap">
                            <div className="text-center">
                                <img
                                    src="/nhs.png"
                                    alt="NHS Logo"
                                    className="h-12 w-auto mx-auto mb-4 opacity-70 hover:opacity-100 transition-opacity duration-300"
                                />
                                <p className="text-gray-600 font-medium">NHS Doctors & Primary Care Network Directors</p>
                            </div>
                            <div className="text-center">
                                <img
                                    src="/Imperial.png"
                                    alt="Imperial College London Logo"
                                    className="h-12 w-auto mx-auto mb-4 opacity-70 hover:opacity-100 transition-opacity duration-300"
                                />
                                <p className="text-gray-600 font-medium">Medical & Engineering Students from Imperial College London</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Vision Section - Concise & Elegant */}
                <section className="py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-slate-100/20"></div>
                    <div className="max-w-4xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-6">The Vision</h2>
                            <h3 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-8">A Future with Zero Barriers to Access</h3>
                        </div>
                        <ul className="grid grid-cols-1 gap-4 list-none">
                            <GridItem
                                variant="professional"
                                icon={<Zap className="h-5 w-5" />}
                                title="Our Long-Term Goal: The AI Receptionist"
                                description={<>
                                    <p className="mb-4">The front desk is the heart of a GP practice, but it&apos;s also a major bottleneck. Our ultimate vision is to eliminate long phone queues and missed calls entirely.</p>
                                    <p>The Healthline AI Receptionist will handle inbound patient calls with human-like empathy and precision, freeing up your reception staff to focus on complex cases that require their expertise. Currently in development pending regulatory approval.</p>
                                </>}
                                className="min-h-[16rem]"
                            />
                        </ul>
                    </div>
                </section>

                {/* Contact Us Section */}
                <section className="py-20 bg-gradient-to-br from-blue-600 via-sky-600 to-blue-700 text-white relative overflow-hidden animated-gradient">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-transparent to-sky-500/15"></div>
                    <div className="max-w-4xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-pulse">Start Automating Your Practice Today</h2>
                            <p className="text-xl text-blue-100">Ready to see how a targeted voice AI solution can reduce your costs and administrative burden? Reach out to us to try our demo.</p>
                        </div>
                        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Practice Name</label>
                                        <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                                    <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"></textarea>
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="gradient-professional"
                                    className="w-full font-semibold py-4 text-lg rounded-lg">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Problem', href: '#problem' },
    { name: 'Solution', href: '#solution' },
    { name: 'Demo', href: '/demo' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link href="/demo">
                                        <span>Try Demo</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link href="#contact">
                                        <span>Contact Us</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden', 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900')}>
                                    <Link href="/demo">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = () => {
    return (
        <div className="flex items-center">
            <img 
                src="/Logo with Text.png" 
                alt="Health Line AI Logo" 
                className="h-24 w-auto md:h-28"
            />
        </div>
    )
}

export default HealthHeroSection;