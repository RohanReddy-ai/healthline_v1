import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'

// Validation schema for contact form
const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name must be less than 100 characters'),
  practiceName: z.string().min(2, 'Practice name must be at least 2 characters').max(200, 'Practice name must be less than 200 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Phone number must be at least 6 characters').max(20, 'Phone number must be less than 20 characters'),
  countryCode: z.string().min(2, 'Country code is required').max(5, 'Invalid country code'),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional()
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate input data
    const validatedData = contactSchema.parse(body)
    
    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([
        {
          full_name: validatedData.fullName,
          practice_name: validatedData.practiceName,
          email: validatedData.email,
          phone: validatedData.phone,
          country_code: validatedData.countryCode,
          message: validatedData.message || null
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      )
    }

    // Track analytics if submission was successful
    if (data) {
      try {
        await supabaseAdmin
          .from('form_analytics')
          .insert([
            {
              event_type: 'form_submission',
              submission_id: data.id,
              metadata: {
                user_agent: request.headers.get('user-agent'),
                timestamp: new Date().toISOString(),
                ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
              }
            }
          ])
      } catch (analyticsError) {
        // Don't fail the main request if analytics fails
        console.error('Analytics error:', analyticsError)
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! We\'ll be in touch soon.',
        submissionId: data.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}