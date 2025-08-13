export interface PythonProject {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  technologies: string[];
  skills: string[];
  category: string;
  languages: string[];
  requirements?: string[];
  learningObjectives?: string[];
  initialFiles?: Array<{
    id: string;
    name: string;
    content: string;
    type: 'file' | 'folder';
  }>;
}

export const PYTHON_PROJECTS: PythonProject[] = [
  {
    id: 1,
    title: "Personal Finance Calculator",
    description: "Build a comprehensive personal finance calculator with compound interest, loan payments, and savings goals. Learn Python fundamentals while creating practical financial tools.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["Python", "Math", "File I/O"],
    skills: ["Variables & Data Types", "Functions", "Loops", "Conditionals", "Math Operations"],
    category: "Finance",
    languages: ["python"],
    requirements: [
      "Calculate compound interest with different compounding frequencies",
      "Compute loan payments and total interest",
      "Track savings goals and timeline",
      "Save calculations to file",
      "Handle user input validation"
    ],
    learningObjectives: [
      "Master Python syntax and basic data types",
      "Learn function definition and parameters", 
      "Practice loops and conditional statements",
      "Understand file operations and data persistence",
      "Apply mathematical concepts in programming"
    ],
    initialFiles: [
      {
        id: '1',
        name: 'main.py',
        content: `# Personal Finance Calculator
# A comprehensive tool for financial calculations

import math
import json
import datetime
import os

def main():
    """Main function to run the finance calculator."""
    print("🏦 Personal Finance Calculator")
    print("=" * 40)
    
    while True:
        print("\\n📊 Available Calculators:")
        print("1. Compound Interest Calculator")
        print("2. Loan Payment Calculator") 
        print("3. Savings Goal Tracker")
        print("4. View Saved Calculations")
        print("5. Exit")
        
        choice = input("\\nChoose an option (1-5): ").strip()
        
        if choice == "1":
            compound_interest_calculator()
        elif choice == "2":
            loan_calculator()
        elif choice == "3":
            savings_goal_calculator()
        elif choice == "4":
            view_saved_calculations()
        elif choice == "5":
            print("\\n💰 Thank you for using the Finance Calculator!")
            break
        else:
            print("❌ Invalid choice. Please try again.")

def compound_interest_calculator():
    """Calculate compound interest with different frequencies."""
    print("\\n💹 Compound Interest Calculator")
    print("-" * 30)
    
    try:
        # Get user input
        principal = float(input("Enter principal amount (USD): "))
        rate = float(input("Enter annual interest rate (%): ")) / 100
        time = float(input("Enter time period (years): "))
        
        print("\\nCompounding frequency:")
        print("1. Annually (1)")
        print("2. Semi-annually (2)")
        print("3. Quarterly (4)")
        print("4. Monthly (12)")
        print("5. Daily (365)")
        
        freq_choice = input("Choose frequency (1-5): ")
        frequencies = {"1": 1, "2": 2, "3": 4, "4": 12, "5": 365}
        frequency = frequencies.get(freq_choice, 1)
        
        # Calculate compound interest: A = P(1 + r/n)^(nt)
        amount = principal * (1 + rate/frequency) ** (frequency * time)
        interest = amount - principal
        
        # Display results
        print("\\n📈 Results:")
        print(f"Principal Amount: USD {principal:,.2f}")
        print(f"Interest Rate: {rate*100:.2f}% annually")
        print(f"Time Period: {time} years")
        print(f"Compounding: {frequency} times per year")
        print(f"\\n💰 Final Amount: USD {amount:,.2f}")
        print(f"💸 Interest Earned: USD {interest:,.2f}")
        
        # Save to file
        save_calculation("Compound Interest", {
            "principal": principal,
            "rate": rate*100,
            "time": time,
            "frequency": frequency,
            "final_amount": amount,
            "interest": interest
        })
        
    except ValueError:
        print("❌ Invalid input. Please enter numbers only.")

def loan_calculator():
    """Calculate loan payments and total interest."""
    print("\\n🏠 Loan Payment Calculator")
    print("-" * 25)
    
    try:
        loan_amount = float(input("Enter loan amount (USD): "))
        annual_rate = float(input("Enter annual interest rate (%): ")) / 100
        years = float(input("Enter loan term (years): "))
        
        # Calculate monthly payment
        monthly_rate = annual_rate / 12
        months = years * 12
        
        if monthly_rate > 0:
            # M = P * [r(1+r)^n] / [(1+r)^n - 1]
            monthly_payment = loan_amount * (monthly_rate * (1 + monthly_rate)**months) / ((1 + monthly_rate)**months - 1)
        else:
            monthly_payment = loan_amount / months
        
        total_payment = monthly_payment * months
        total_interest = total_payment - loan_amount
        
        print("\\n💳 Loan Details:")
        print(f"Loan Amount: USD {loan_amount:,.2f}")
        print(f"Interest Rate: {annual_rate*100:.2f}% annually")
        print(f"Loan Term: {years} years ({months:.0f} months)")
        print("\\n💰 Payment Details:")
        print(f"Monthly Payment: USD {monthly_payment:,.2f}")
        print(f"Total Payment: USD {total_payment:,.2f}")
        print(f"Total Interest: USD {total_interest:,.2f}")
        
        save_calculation("Loan Payment", {
            "loan_amount": loan_amount,
            "rate": annual_rate*100,
            "years": years,
            "monthly_payment": monthly_payment,
            "total_payment": total_payment,
            "total_interest": total_interest
        })
        
    except ValueError:
        print("❌ Invalid input. Please enter numbers only.")

def savings_goal_calculator():
    """Calculate how long it takes to reach savings goals."""
    print("\\n🎯 Savings Goal Tracker")
    print("-" * 22)
    
    try:
        goal_amount = float(input("Enter your savings goal (USD): "))
        current_savings = float(input("Enter current savings (USD): "))
        monthly_contribution = float(input("Enter monthly contribution (USD): "))
        annual_interest = float(input("Enter annual interest rate (% or 0): ")) / 100
        
        if goal_amount <= current_savings:
            print("🎉 Congratulations! You've already reached your goal!")
            return
        
        remaining = goal_amount - current_savings
        monthly_rate = annual_interest / 12
        
        # Calculate months to reach goal with compound interest
        if monthly_rate > 0 and monthly_contribution > 0:
            # Using compound interest formula for annuities
            months = math.log(1 + (remaining * monthly_rate) / monthly_contribution) / math.log(1 + monthly_rate)
        else:
            months = remaining / monthly_contribution if monthly_contribution > 0 else 0
        
        years = months / 12
        target_date = datetime.datetime.now() + datetime.timedelta(days=months * 30)
        
        print("\\n🎯 Savings Plan:")
        print(f"Goal Amount: USD {goal_amount:,.2f}")
        print(f"Current Savings: USD {current_savings:,.2f}")
        print(f"Remaining Needed: USD {remaining:,.2f}")
        print(f"Monthly Contribution: USD {monthly_contribution:,.2f}")
        print(f"Interest Rate: {annual_interest*100:.2f}% annually")
        print("\\n⏰ Timeline:")
        print(f"Time to Goal: {months:.1f} months ({years:.1f} years)")
        print(f"Target Date: {target_date.strftime('%B %Y')}")
        
        save_calculation("Savings Goal", {
            "goal_amount": goal_amount,
            "current_savings": current_savings,
            "monthly_contribution": monthly_contribution,
            "interest_rate": annual_interest*100,
            "months_to_goal": months,
            "target_date": target_date.strftime('%Y-%m-%d')
        })
        
    except ValueError:
        print("❌ Invalid input. Please enter numbers only.")
    except Exception as e:
        print(f"❌ Error in calculation: {e}")

def save_calculation(calc_type, data):
    """Save calculation to a JSON file."""
    try:
        # Create calculations directory if it doesn't exist
        os.makedirs("calculations", exist_ok=True)
        
        # Prepare calculation record
        calculation = {
            "type": calc_type,
            "data": data,
            "timestamp": datetime.datetime.now().isoformat(),
            "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        # Load existing calculations
        filename = "calculations/finance_history.json"
        calculations = []
        
        if os.path.exists(filename):
            try:
                with open(filename, 'r') as f:
                    calculations = json.load(f)
            except json.JSONDecodeError:
                calculations = []
        
        # Add new calculation
        calculations.append(calculation)
        
        # Save updated calculations
        with open(filename, 'w') as f:
            json.dump(calculations, f, indent=2)
        
        print("\\n💾 Calculation saved!")
        
    except Exception as e:
        print(f"❌ Error saving calculation: {e}")

def view_saved_calculations():
    """Display all saved calculations."""
    print("\\n📂 Saved Calculations")
    print("-" * 20)
    
    filename = "calculations/finance_history.json"
    
    if not os.path.exists(filename):
        print("📄 No saved calculations found.")
        return
    
    try:
        with open(filename, 'r') as f:
            calculations = json.load(f)
        
        if not calculations:
            print("📄 No calculations in history.")
            return
        
        print(f"\\n📊 Found {len(calculations)} saved calculations:\\n")
        
        for i, calc in enumerate(calculations[-5:], 1):  # Show last 5
            print(f"{i}. {calc['type']} - {calc['date']}")
            
            if calc['type'] == "Compound Interest":
                data = calc['data']
                print(f"   Principal: USD {data['principal']:,.2f}")
                print(f"   Final Amount: USD {data['final_amount']:,.2f}")
                
            elif calc['type'] == "Loan Payment":
                data = calc['data']
                print(f"   Loan: USD {data['loan_amount']:,.2f}")
                print(f"   Monthly Payment: USD {data['monthly_payment']:,.2f}")
                
            elif calc['type'] == "Savings Goal":
                data = calc['data']
                print(f"   Goal: USD {data['goal_amount']:,.2f}")
                print(f"   Time to Goal: {data['months_to_goal']:.1f} months")
            
            print()  # Empty line between calculations
            
    except Exception as e:
        print(f"❌ Error reading calculations: {e}")

if __name__ == "__main__":
    main()`,
        type: 'file'
      }
    ]
  },
  {
    id: 2,
    title: "Text Analysis & Word Counter",
    description: "Create a comprehensive text analysis tool that processes text files and provides detailed statistics. Learn file handling, string manipulation, and data analysis fundamentals.",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    technologies: ["Python", "File I/O", "Regular Expressions", "Statistics"],
    skills: ["String Manipulation", "File Operations", "Data Structures", "Regular Expressions", "Error Handling"],
    category: "Text Processing",
    languages: ["python"],
    requirements: [
      "Count words, characters, sentences, and paragraphs",
      "Find most common words and their frequencies",
      "Calculate reading time and complexity metrics",
      "Generate detailed reports and save to files",
      "Handle multiple file formats (txt, csv)"
    ],
    learningObjectives: [
      "Master string methods and manipulation",
      "Learn file reading and writing operations",
      "Understand dictionaries and data counting",
      "Practice regular expressions for pattern matching",
      "Implement error handling and validation"
    ],
    initialFiles: [
      {
        id: '1',
        name: 'main.py',
        content: `# Text Analysis & Word Counter
# Comprehensive text analysis tool for files and user input

import os
import re
import json
import datetime
from collections import Counter

def main():
    """Main function to run the text analyzer."""
    print("📝 Text Analysis & Word Counter")
    print("=" * 35)
    
    while True:
        print("\\n🔍 Text Analysis Options:")
        print("1. Analyze text from file")
        print("2. Analyze custom text input")
        print("3. Create sample text file")
        print("4. View analysis history")
        print("5. Exit")
        
        choice = input("\\nChoose an option (1-5): ").strip()
        
        if choice == "1":
            analyze_file()
        elif choice == "2":
            analyze_custom_text()
        elif choice == "3":
            create_sample_file()
        elif choice == "4":
            view_analysis_history()
        elif choice == "5":
            print("\\n📚 Thank you for using Text Analyzer!")
            break
        else:
            print("❌ Invalid choice. Please try again.")

def analyze_file():
    """Analyze text from a file."""
    print("\\n📂 File Text Analysis")
    print("-" * 20)
    
    filename = input("Enter filename: ").strip()
    
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            text = file.read()
        
        print(f"\\n✅ Successfully loaded '{filename}'")
        analysis = analyze_text(text)
        display_analysis(analysis, f"File: {filename}")
        save_analysis(analysis, filename)
        
    except FileNotFoundError:
        print(f"❌ File '{filename}' not found.")
        print("💡 Create a sample file first using option 3.")
    except Exception as e:
        print(f"❌ Error reading file: {e}")

def analyze_custom_text():
    """Analyze user-provided text."""
    print("\\n✏️  Custom Text Analysis")
    print("-" * 22)
    print("Enter your text (type 'END' on a new line to finish):")
    
    lines = []
    while True:
        line = input()
        if line.strip().upper() == 'END':
            break
        lines.append(line)
    
    text = '\\n'.join(lines)
    
    if text.strip():
        analysis = analyze_text(text)
        display_analysis(analysis, "Custom Text")
        save_analysis(analysis, "custom_input")
    else:
        print("❌ No text provided for analysis.")

def analyze_text(text):
    """Perform comprehensive text analysis."""
    # Basic counts
    char_count = len(text)
    char_count_no_spaces = len(text.replace(' ', ''))
    word_count = len(text.split())
    
    # Sentence and paragraph counts  
    sentences = re.split(r'[.!?]+', text)
    sentence_count = len([s for s in sentences if s.strip()])
    
    paragraphs = text.split('\\n\\n')
    paragraph_count = len([p for p in paragraphs if p.strip()])
    
    # Word frequency analysis
    words = re.findall(r'\\b\\w+\\b', text.lower())
    word_freq = Counter(words)
    most_common = word_freq.most_common(10)
    
    # Reading time (average 200 words per minute)
    reading_time = word_count / 200
    
    # Average word and sentence length
    avg_word_length = sum(len(word) for word in words) / len(words) if words else 0
    avg_sentence_length = word_count / sentence_count if sentence_count else 0
    
    return {
        'char_count': char_count,
        'char_count_no_spaces': char_count_no_spaces,
        'word_count': word_count,
        'sentence_count': sentence_count,
        'paragraph_count': paragraph_count,
        'most_common_words': most_common,
        'reading_time_minutes': reading_time,
        'avg_word_length': avg_word_length,
        'avg_sentence_length': avg_sentence_length,
        'unique_words': len(word_freq)
    }

def display_analysis(analysis, source):
    """Display the text analysis results."""
    print(f"\\n📊 Analysis Results - {source}")
    print("=" * 50)
    
    print("\\n📏 Basic Statistics:")
    print(f"Characters (with spaces): {analysis['char_count']:,}")
    print(f"Characters (no spaces): {analysis['char_count_no_spaces']:,}")
    print(f"Words: {analysis['word_count']:,}")
    print(f"Sentences: {analysis['sentence_count']:,}")
    print(f"Paragraphs: {analysis['paragraph_count']:,}")
    print(f"Unique words: {analysis['unique_words']:,}")
    
    print("\\n📖 Reading Metrics:")
    print(f"Estimated reading time: {analysis['reading_time_minutes']:.1f} minutes")
    print(f"Average word length: {analysis['avg_word_length']:.1f} characters")
    print(f"Average sentence length: {analysis['avg_sentence_length']:.1f} words")
    
    print("\\n🔤 Most Common Words:")
    for i, (word, count) in enumerate(analysis['most_common_words'], 1):
        percentage = (count / analysis['word_count']) * 100
        print(f"{i:2d}. '{word}' - {count} times ({percentage:.1f}%)")

def create_sample_file():
    """Create a sample text file for testing."""
    sample_text = '''Welcome to Python Text Analysis!

This is a sample text file that demonstrates the capabilities of our text analysis tool. 
Python is a powerful programming language that excels at text processing and data analysis.

In this example, we can see various features:
- Word counting and frequency analysis
- Character and sentence statistics
- Reading time estimation
- File input and output operations

The beauty of Python lies in its simplicity and readability. 
Whether you're analyzing literature, processing data, or building applications, 
Python provides the tools you need to succeed.

Try analyzing this text to see detailed statistics about word usage, 
sentence structure, and reading complexity. Happy coding!'''
    
    filename = "sample_text.txt"
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(sample_text)
        print(f"✅ Sample file '{filename}' created successfully!")
        print("💡 You can now analyze it using option 1.")
    except Exception as e:
        print(f"❌ Error creating sample file: {e}")

def save_analysis(analysis, source):
    """Save analysis results to JSON file."""
    try:
        os.makedirs("analysis_results", exist_ok=True)
        
        result = {
            "source": source,
            "analysis": analysis,
            "timestamp": datetime.datetime.now().isoformat(),
            "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        filename = "analysis_results/text_analysis_history.json"
        results = []
        
        if os.path.exists(filename):
            try:
                with open(filename, 'r') as f:
                    results = json.load(f)
            except json.JSONDecodeError:
                results = []
        
        results.append(result)
        
        with open(filename, 'w') as f:
            json.dump(results, f, indent=2)
        
        print("\\n💾 Analysis saved!")
        
    except Exception as e:
        print(f"❌ Error saving analysis: {e}")

def view_analysis_history():
    """Display saved analysis history."""
    print("\\n📂 Analysis History")
    print("-" * 18)
    
    filename = "analysis_results/text_analysis_history.json"
    
    if not os.path.exists(filename):
        print("📄 No analysis history found.")
        return
    
    try:
        with open(filename, 'r') as f:
            results = json.load(f)
        
        if not results:
            print("📄 No analysis results in history.")
            return
        
        print(f"\\n📊 Found {len(results)} analysis results:\\n")
        
        for i, result in enumerate(results[-5:], 1):  # Show last 5
            analysis = result['analysis']
            print(f"{i}. {result['source']} - {result['date']}")
            print(f"   Words: {analysis['word_count']:,}")
            print(f"   Reading time: {analysis['reading_time_minutes']:.1f} min")
            print()
            
    except Exception as e:
        print(f"❌ Error reading analysis history: {e}")

if __name__ == "__main__":
    main()`,
        type: 'file'
      }
    ]
  }
];