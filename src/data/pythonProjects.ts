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
  // BEGINNER LEVEL (1-15)
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

if __name__ == "__main__":
    main()
`,
        
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
        principal = float(input("Enter principal amount ($): "))
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
        
        # Calculate compound interest
        # A = P(1 + r/n)^(nt)
        amount = principal * (1 + rate/frequency) ** (frequency * time)
        interest = amount - principal
        
        # Display results
        print(f"\\n📈 Results:")
        print(f"Principal Amount: ${principal:,.2f}")
        print(f"Interest Rate: {rate*100:.2f}% annually")
        print(f"Time Period: {time} years")
        print(f"Compounding: {frequency} times per year")
        print(f"\\n💰 Final Amount: ${amount:,.2f}")
        print(f"💸 Interest Earned: ${interest:,.2f}")
        
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
        loan_amount = float(input("Enter loan amount ($): "))
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
        
        print(f"\\n💳 Loan Details:")
        print(f"Loan Amount: ${loan_amount:,.2f}")
        print(f"Interest Rate: {annual_rate*100:.2f}% annually")
        print(f"Loan Term: {years} years ({months:.0f} months)")
        print(f"\\n💰 Payment Details:")
        print(f"Monthly Payment: ${monthly_payment:,.2f}")
        print(f"Total Payment: ${total_payment:,.2f}")
        print(f"Total Interest: ${total_interest:,.2f}")
        
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

if __name__ == "__main__":
    main()
`,
        type: 'file'
      },
      {
        id: '2',
        name: 'savings_tracker.py',
        content: `# Savings Goal Tracker Module
import datetime

def savings_goal_calculator():
    """Calculate how long it takes to reach savings goals."""
    print("\\n🎯 Savings Goal Tracker")
    print("-" * 22)
    
    try:
        goal_amount = float(input("Enter your savings goal ($): "))
        current_savings = float(input("Enter current savings ($): "))
        monthly_contribution = float(input("Enter monthly contribution ($): "))
        annual_interest = float(input("Enter annual interest rate (% or 0): ")) / 100
        
        if goal_amount <= current_savings:
            print("🎉 Congratulations! You've already reached your goal!")
            return
        
        remaining = goal_amount - current_savings
        monthly_rate = annual_interest / 12
        
        # Calculate months to reach goal with compound interest
        if monthly_rate > 0:
            # Using compound interest formula for annuities
            months = math.log(1 + (remaining * monthly_rate) / monthly_contribution) / math.log(1 + monthly_rate)
        else:
            months = remaining / monthly_contribution
        
        years = months / 12
        target_date = datetime.datetime.now() + datetime.timedelta(days=months * 30)
        
        print(f"\\n🎯 Savings Plan:")
        print(f"Goal Amount: ${goal_amount:,.2f}")
        print(f"Current Savings: ${current_savings:,.2f}")
        print(f"Remaining Needed: ${remaining:,.2f}")
        print(f"Monthly Contribution: ${monthly_contribution:,.2f}")
        print(f"Interest Rate: {annual_interest*100:.2f}% annually")
        print(f"\\n⏰ Timeline:")
        print(f"Time to Goal: {months:.1f} months ({years:.1f} years)")
        print(f"Target Date: {target_date.strftime('%B %Y')}")
        
        # Show progress milestones
        print(f"\\n📊 Milestones:")
        for percent in [25, 50, 75]:
            milestone_amount = current_savings + (remaining * percent / 100)
            milestone_months = months * percent / 100
            milestone_date = datetime.datetime.now() + datetime.timedelta(days=milestone_months * 30)
            print(f"{percent}% of goal (${milestone_amount:,.2f}): {milestone_date.strftime('%b %Y')}")
        
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

# You'll need to import math for logarithmic calculations
import math
`,
        type: 'file'
      },
      {
        id: '3',
        name: 'file_operations.py',
        content: `# File Operations for Finance Calculator
import json
import datetime
import os

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
        
        print(f"\\n💾 Calculation saved to {filename}")
        
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
        
        for i, calc in enumerate(calculations[-10:], 1):  # Show last 10
            print(f"{i}. {calc['type']} - {calc['date']}")
            
            if calc['type'] == "Compound Interest":
                data = calc['data']
                print(f"   Principal: ${data['principal']:,.2f}")
                print(f"   Final Amount: ${data['final_amount']:,.2f}")
                print(f"   Interest: ${data['interest']:,.2f}")
                
            elif calc['type'] == "Loan Payment":
                data = calc['data']
                print(f"   Loan: ${data['loan_amount']:,.2f}")
                print(f"   Monthly Payment: ${data['monthly_payment']:,.2f}")
                
            elif calc['type'] == "Savings Goal":
                data = calc['data']
                print(f"   Goal: ${data['goal_amount']:,.2f}")
                print(f"   Time to Goal: {data['months_to_goal']:.1f} months")
            
            print()  # Empty line between calculations
        
        if len(calculations) > 10:
            print(f"... and {len(calculations) - 10} more calculations")
            
    except Exception as e:
        print(f"❌ Error reading calculations: {e}")

def export_calculations_csv():
    """Export calculations to CSV format."""
    try:
        import csv
        
        filename = "calculations/finance_history.json"
        if not os.path.exists(filename):
            print("📄 No calculations to export.")
            return
        
        with open(filename, 'r') as f:
            calculations = json.load(f)
        
        # Create CSV file
        csv_filename = "calculations/finance_export.csv"
        with open(csv_filename, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['Date', 'Type', 'Details'])
            
            for calc in calculations:
                date = calc['date']
                calc_type = calc['type']
                details = str(calc['data'])
                writer.writerow([date, calc_type, details])
        
        print(f"✅ Calculations exported to {csv_filename}")
        
    except ImportError:
        print("❌ CSV module not available for export")
    except Exception as e:
        print(f"❌ Error exporting: {e}")
`,
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
from collections import Counter
import datetime

def main():
    """Main function to run the text analyzer."""
    print("📝 Text Analysis & Word Counter")
    print("=" * 35)
    
    while True:
        print("\\n🔍 Text Analysis Options:")
        print("1. Analyze text from file")
        print("2. Analyze custom text input")
        print("3. Compare two texts")
        print("4. View analysis history")
        print("5. Exit")
        
        choice = input("\\nChoose an option (1-5): ").strip()
        
        if choice == "1":
            analyze_file()
        elif choice == "2":
            analyze_custom_text()
        elif choice == "3":
            compare_texts()
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
    
    filename = input("Enter filename (or 'sample' for demo): ").strip()
    
    if filename.lower() == 'sample':
        # Create a sample file for demonstration
        create_sample_file()
        filename = "sample_text.txt"
    
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            text = file.read()
        
        print(f"\\n✅ Successfully loaded '{filename}'")
        analysis = analyze_text(text)
        display_analysis(analysis, f"File: {filename}")
        save_analysis(analysis, filename)
        
    except FileNotFoundError:
        print(f"❌ File '{filename}' not found.")
        print("💡 Make sure the file exists in the current directory.")
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
    
    if not text.strip():
        print("❌ No text provided for analysis.")
        return
    
    analysis = analyze_text(text)
    display_analysis(analysis, "Custom Text Input")
    save_analysis(analysis, "custom_input")

def analyze_text(text):
    """Perform comprehensive text analysis."""
    analysis = {}
    
    # Basic counts
    analysis['character_count'] = len(text)
    analysis['character_count_no_spaces'] = len(text.replace(' ', ''))
    analysis['word_count'] = len(text.split())
    analysis['line_count'] = len(text.split('\\n'))
    
    # Sentence and paragraph counts
    sentences = re.split(r'[.!?]+', text)
    analysis['sentence_count'] = len([s for s in sentences if s.strip()])
    
    paragraphs = [p for p in text.split('\\n\\n') if p.strip()]
    analysis['paragraph_count'] = len(paragraphs)
    
    # Word frequency analysis
    words = re.findall(r'\\b\\w+\\b', text.lower())
    word_freq = Counter(words)
    analysis['most_common_words'] = word_freq.most_common(10)
    analysis['unique_words'] = len(word_freq)
    
    # Reading metrics
    # Average reading speed: 200-250 words per minute
    analysis['reading_time_minutes'] = analysis['word_count'] / 225
    
    # Average word length
    if words:
        analysis['average_word_length'] = sum(len(word) for word in words) / len(words)
    else:
        analysis['average_word_length'] = 0
    
    # Complexity metrics
    if analysis['sentence_count'] > 0:
        analysis['words_per_sentence'] = analysis['word_count'] / analysis['sentence_count']
    else:
        analysis['words_per_sentence'] = 0
    
    # Letter frequency
    letters = re.findall(r'[a-zA-Z]', text.lower())
    analysis['letter_frequency'] = Counter(letters).most_common(5)
    
    return analysis

def display_analysis(analysis, source):
    """Display comprehensive analysis results."""
    print(f"\\n📊 Analysis Results: {source}")
    print("=" * 50)
    
    # Basic statistics
    print("\\n📏 Basic Statistics:")
    print(f"  Characters (total): {analysis['character_count']:,}")
    print(f"  Characters (no spaces): {analysis['character_count_no_spaces']:,}")
    print(f"  Words: {analysis['word_count']:,}")
    print(f"  Unique words: {analysis['unique_words']:,}")
    print(f"  Sentences: {analysis['sentence_count']:,}")
    print(f"  Paragraphs: {analysis['paragraph_count']:,}")
    print(f"  Lines: {analysis['line_count']:,}")
    
    # Reading metrics
    print(f"\\n⏱️  Reading Metrics:")
    reading_minutes = analysis['reading_time_minutes']
    if reading_minutes < 1:
        print(f"  Estimated reading time: {reading_minutes * 60:.0f} seconds")
    else:
        print(f"  Estimated reading time: {reading_minutes:.1f} minutes")
    
    print(f"  Average word length: {analysis['average_word_length']:.1f} characters")
    print(f"  Words per sentence: {analysis['words_per_sentence']:.1f}")
    
    # Complexity assessment
    complexity = get_complexity_level(analysis)
    print(f"  Text complexity: {complexity}")
    
    # Most common words
    print(f"\\n🔤 Most Common Words:")
    for word, count in analysis['most_common_words']:
        percentage = (count / analysis['word_count']) * 100
        print(f"  '{word}': {count} times ({percentage:.1f}%)")
    
    # Letter frequency
    print(f"\\n🔤 Most Common Letters:")
    for letter, count in analysis['letter_frequency']:
        print(f"  '{letter}': {count} times")

def get_complexity_level(analysis):
    """Determine text complexity level."""
    words_per_sentence = analysis['words_per_sentence']
    avg_word_length = analysis['average_word_length']
    
    # Simple scoring system
    complexity_score = 0
    
    if words_per_sentence > 20:
        complexity_score += 2
    elif words_per_sentence > 15:
        complexity_score += 1
    
    if avg_word_length > 6:
        complexity_score += 2
    elif avg_word_length > 4.5:
        complexity_score += 1
    
    if complexity_score >= 3:
        return "Complex"
    elif complexity_score >= 1:
        return "Moderate"
    else:
        return "Simple"

if __name__ == "__main__":
    main()
`,
        type: 'file'
      },
      {
        id: '2',
        name: 'text_utilities.py',
        content: `# Text Utilities and Helper Functions
import re
import json
import datetime
import os

def create_sample_file():
    """Create a sample text file for demonstration."""
    sample_text = """Welcome to Text Analysis Tool

This is a comprehensive text analysis program written in Python. It demonstrates
various programming concepts including file operations, string manipulation,
and data analysis.

The program can analyze any text file and provide detailed statistics about:
- Word count and frequency
- Character and sentence counts  
- Reading time estimates
- Text complexity metrics
- Most common words and letters

Python is an excellent language for text processing because of its powerful
string methods and built-in libraries. This project showcases practical
applications of programming concepts you'll use in real-world scenarios.

Text analysis has many applications in fields like:
1. Content writing and editing
2. Academic research
3. Social media analysis  
4. Natural language processing
5. Search engine optimization

Try running this analysis on different types of text to see how the metrics
vary between simple and complex writing styles!"""

    try:
        with open("sample_text.txt", "w", encoding="utf-8") as f:
            f.write(sample_text)
        print("✅ Created sample_text.txt for demonstration")
    except Exception as e:
        print(f"❌ Error creating sample file: {e}")

def compare_texts():
    """Compare analysis between two text sources."""
    print("\\n🔄 Text Comparison")
    print("-" * 16)
    
    print("First text source:")
    print("1. From file")
    print("2. Type custom text")
    choice1 = input("Choose option (1-2): ").strip()
    
    if choice1 == "1":
        filename1 = input("Enter first filename: ").strip()
        try:
            with open(filename1, 'r', encoding='utf-8') as f:
                text1 = f.read()
            source1 = f"File: {filename1}"
        except FileNotFoundError:
            print(f"❌ File '{filename1}' not found.")
            return
    else:
        print("Enter first text (type 'END' to finish):")
        lines = []
        while True:
            line = input()
            if line.strip().upper() == 'END':
                break
            lines.append(line)
        text1 = '\\n'.join(lines)
        source1 = "Custom Text 1"
    
    print("\\nSecond text source:")
    print("1. From file")
    print("2. Type custom text")
    choice2 = input("Choose option (1-2): ").strip()
    
    if choice2 == "1":
        filename2 = input("Enter second filename: ").strip()
        try:
            with open(filename2, 'r', encoding='utf-8') as f:
                text2 = f.read()
            source2 = f"File: {filename2}"
        except FileNotFoundError:
            print(f"❌ File '{filename2}' not found.")
            return
    else:
        print("Enter second text (type 'END' to finish):")
        lines = []
        while True:
            line = input()
            if line.strip().upper() == 'END':
                break
            lines.append(line)
        text2 = '\\n'.join(lines)
        source2 = "Custom Text 2"
    
    # Import analyze_text function
    from main import analyze_text
    
    analysis1 = analyze_text(text1)
    analysis2 = analyze_text(text2)
    
    display_comparison(analysis1, analysis2, source1, source2)

def display_comparison(analysis1, analysis2, source1, source2):
    """Display side-by-side comparison of two text analyses."""
    print(f"\\n📊 Comparison Results")
    print("=" * 60)
    print(f"{'Metric':<25} {'Text 1':<15} {'Text 2':<15} {'Difference':<15}")
    print("-" * 60)
    
    metrics = [
        ('Words', 'word_count'),
        ('Characters', 'character_count'),
        ('Sentences', 'sentence_count'),
        ('Paragraphs', 'paragraph_count'),
        ('Unique Words', 'unique_words'),
        ('Avg Word Length', 'average_word_length'),
        ('Words/Sentence', 'words_per_sentence'),
        ('Reading Time (min)', 'reading_time_minutes')
    ]
    
    for label, key in metrics:
        val1 = analysis1[key]
        val2 = analysis2[key]
        
        if isinstance(val1, float):
            diff = val2 - val1
            print(f"{label:<25} {val1:<15.1f} {val2:<15.1f} {diff:<+15.1f}")
        else:
            diff = val2 - val1
            print(f"{label:<25} {val1:<15,} {val2:<15,} {diff:<+15,}")
    
    print("\\n📈 Summary:")
    if analysis1['word_count'] > analysis2['word_count']:
        print(f"  {source1} is longer by {analysis1['word_count'] - analysis2['word_count']} words")
    elif analysis2['word_count'] > analysis1['word_count']:
        print(f"  {source2} is longer by {analysis2['word_count'] - analysis1['word_count']} words")
    else:
        print("  Both texts have the same word count")
    
    # Complexity comparison
    from main import get_complexity_level
    complexity1 = get_complexity_level(analysis1)
    complexity2 = get_complexity_level(analysis2)
    print(f"  Text 1 complexity: {complexity1}")
    print(f"  Text 2 complexity: {complexity2}")

def save_analysis(analysis, source):
    """Save analysis results to a JSON file."""
    try:
        os.makedirs("analysis_results", exist_ok=True)
        
        # Prepare analysis record
        record = {
            "source": source,
            "analysis": analysis,
            "timestamp": datetime.datetime.now().isoformat(),
            "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        # Load existing history
        history_file = "analysis_results/analysis_history.json"
        history = []
        
        if os.path.exists(history_file):
            try:
                with open(history_file, 'r') as f:
                    history = json.load(f)
            except json.JSONDecodeError:
                history = []
        
        # Add new record
        history.append(record)
        
        # Save updated history
        with open(history_file, 'w') as f:
            json.dump(history, f, indent=2)
        
        print(f"\\n💾 Analysis saved to {history_file}")
        
    except Exception as e:
        print(f"❌ Error saving analysis: {e}")

def view_analysis_history():
    """Display saved analysis history."""
    print("\\n📂 Analysis History")
    print("-" * 17)
    
    history_file = "analysis_results/analysis_history.json"
    
    if not os.path.exists(history_file):
        print("📄 No analysis history found.")
        return
    
    try:
        with open(history_file, 'r') as f:
            history = json.load(f)
        
        if not history:
            print("📄 No analyses in history.")
            return
        
        print(f"\\n📊 Found {len(history)} saved analyses:\\n")
        
        for i, record in enumerate(history[-10:], 1):  # Show last 10
            print(f"{i}. {record['source']} - {record['date']}")
            analysis = record['analysis']
            print(f"   Words: {analysis['word_count']:,}")
            print(f"   Reading time: {analysis['reading_time_minutes']:.1f} minutes")
            print(f"   Complexity: {get_complexity_level(analysis)}")
            print()
        
        if len(history) > 10:
            print(f"... and {len(history) - 10} more analyses")
            
    except Exception as e:
        print(f"❌ Error reading history: {e}")

# Import get_complexity_level if running this module standalone
try:
    from main import get_complexity_level
except ImportError:
    def get_complexity_level(analysis):
        words_per_sentence = analysis['words_per_sentence']
        avg_word_length = analysis['average_word_length']
        
        complexity_score = 0
        if words_per_sentence > 20:
            complexity_score += 2
        elif words_per_sentence > 15:
            complexity_score += 1
        
        if avg_word_length > 6:
            complexity_score += 2
        elif avg_word_length > 4.5:
            complexity_score += 1
        
        if complexity_score >= 3:
            return "Complex"
        elif complexity_score >= 1:
            return "Moderate"
        else:
            return "Simple"
`,
        type: 'file'
      }
    ]
  },
  {
    id: 3,
    title: "Student Grade Management System",
    description: "Build a comprehensive student grade management system with classes, data persistence, and statistical analysis. Perfect for learning object-oriented programming concepts.",
    difficulty: "Beginner",
    estimatedTime: "1-2 weeks",
    technologies: ["Python", "OOP", "File I/O", "JSON", "Statistics"],
    skills: ["Classes & Objects", "Data Structures", "File Operations", "Statistical Analysis", "Menu Systems"],
    category: "Education",
    languages: ["python"],
    requirements: [
      "Create Student and Course classes with proper methods",
      "Add, edit, and delete student records",
      "Calculate grades, GPA, and class statistics",
      "Save/load data to/from JSON files",
      "Generate detailed reports and transcripts"
    ],
    learningObjectives: [
      "Master object-oriented programming concepts",
      "Learn class design and method implementation",
      "Practice data persistence with JSON",
      "Understand statistical calculations and analysis",
      "Implement comprehensive error handling"
    ],
    initialFiles: [
      {
        id: '1',
        name: 'main.py',
        content: `# Student Grade Management System
# A comprehensive system for managing student grades and academic records

from student import Student
from course import Course
from grade_manager import GradeManager
import json

def main():
    """Main function to run the grade management system."""
    print("🎓 Student Grade Management System")
    print("=" * 40)
    
    # Initialize the grade manager
    manager = GradeManager()
    manager.load_data()
    
    while True:
        display_main_menu()
        choice = input("\\nChoose an option (1-8): ").strip()
        
        if choice == "1":
            student_management_menu(manager)
        elif choice == "2":
            course_management_menu(manager)
        elif choice == "3":
            grade_management_menu(manager)
        elif choice == "4":
            reports_menu(manager)
        elif choice == "5":
            statistics_menu(manager)
        elif choice == "6":
            search_menu(manager)
        elif choice == "7":
            manager.save_data()
            print("✅ Data saved successfully!")
        elif choice == "8":
            manager.save_data()
            print("\\n🎓 Thank you for using the Grade Management System!")
            break
        else:
            print("❌ Invalid choice. Please try again.")

def display_main_menu():
    """Display the main menu options."""
    print("\\n📚 Main Menu:")
    print("1. 👤 Student Management")
    print("2. 📖 Course Management") 
    print("3. 📊 Grade Management")
    print("4. 📄 Reports")
    print("5. 📈 Statistics")
    print("6. 🔍 Search")
    print("7. 💾 Save Data")
    print("8. 🚪 Exit")

def student_management_menu(manager):
    """Handle student management operations."""
    while True:
        print("\\n👤 Student Management:")
        print("1. Add new student")
        print("2. View all students")
        print("3. View student details")
        print("4. Edit student information")
        print("5. Delete student")
        print("6. Back to main menu")
        
        choice = input("\\nChoose an option (1-6): ").strip()
        
        if choice == "1":
            add_new_student(manager)
        elif choice == "2":
            view_all_students(manager)
        elif choice == "3":
            view_student_details(manager)
        elif choice == "4":
            edit_student_info(manager)
        elif choice == "5":
            delete_student(manager)
        elif choice == "6":
            break
        else:
            print("❌ Invalid choice. Please try again.")

def add_new_student(manager):
    """Add a new student to the system."""
    print("\\n➕ Add New Student")
    print("-" * 16)
    
    try:
        student_id = input("Enter student ID: ").strip()
        
        # Check if student ID already exists
        if manager.get_student(student_id):
            print(f"❌ Student with ID '{student_id}' already exists!")
            return
        
        first_name = input("Enter first name: ").strip()
        last_name = input("Enter last name: ").strip()
        email = input("Enter email: ").strip()
        
        print("\\nYear level:")
        print("1. Freshman")
        print("2. Sophomore") 
        print("3. Junior")
        print("4. Senior")
        year_choice = input("Choose year (1-4): ").strip()
        
        year_map = {"1": "Freshman", "2": "Sophomore", "3": "Junior", "4": "Senior"}
        year = year_map.get(year_choice, "Freshman")
        
        major = input("Enter major: ").strip()
        
        # Create new student
        student = Student(student_id, first_name, last_name, email, year, major)
        manager.add_student(student)
        
        print(f"\\n✅ Student '{first_name} {last_name}' added successfully!")
        print(f"   ID: {student_id}")
        print(f"   Year: {year}")
        print(f"   Major: {major}")
        
    except Exception as e:
        print(f"❌ Error adding student: {e}")

def view_all_students(manager):
    """Display all students in the system."""
    print("\\n👥 All Students")
    print("-" * 12)
    
    students = manager.get_all_students()
    
    if not students:
        print("📄 No students found in the system.")
        return
    
    print(f"\\n📊 Total Students: {len(students)}\\n")
    print(f"{'ID':<10} {'Name':<25} {'Year':<12} {'Major':<20} {'GPA':<6}")
    print("-" * 75)
    
    for student in students:
        gpa = student.calculate_gpa()
        gpa_str = f"{gpa:.2f}" if gpa > 0 else "N/A"
        print(f"{student.student_id:<10} {student.get_full_name():<25} {student.year:<12} {student.major:<20} {gpa_str:<6}")

def view_student_details(manager):
    """View detailed information for a specific student."""
    print("\\n🔍 Student Details")
    print("-" * 15)
    
    student_id = input("Enter student ID: ").strip()
    student = manager.get_student(student_id)
    
    if not student:
        print(f"❌ Student with ID '{student_id}' not found!")
        return
    
    print(f"\\n📋 Student Information:")
    print(f"ID: {student.student_id}")
    print(f"Name: {student.get_full_name()}")
    print(f"Email: {student.email}")
    print(f"Year: {student.year}")
    print(f"Major: {student.major}")
    print(f"GPA: {student.calculate_gpa():.2f}")
    
    # Show enrolled courses and grades
    courses = student.get_courses()
    if courses:
        print(f"\\n📚 Enrolled Courses ({len(courses)}):")
        print(f"{'Course':<12} {'Grade':<6} {'Credits':<8} {'Points':<8}")
        print("-" * 35)
        
        for course_id, grade_info in courses.items():
            course = manager.get_course(course_id)
            if course:
                grade = grade_info['grade']
                points = Student.grade_to_points(grade) * course.credits
                print(f"{course_id:<12} {grade:<6} {course.credits:<8} {points:<8.1f}")
    else:
        print("\\n📚 No courses enrolled.")

if __name__ == "__main__":
    main()
`,
        type: 'file'
      },
      {
        id: '2',
        name: 'student.py',
        content: `# Student Class - Represents individual students and their academic information

class Student:
    """Class to represent a student with their academic information."""
    
    def __init__(self, student_id, first_name, last_name, email, year, major):
        """Initialize a new student."""
        self.student_id = student_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.year = year
        self.major = major
        self.courses = {}  # Dictionary to store course_id: grade_info
        self.date_enrolled = None
    
    def get_full_name(self):
        """Return the student's full name."""
        return f"{self.first_name} {self.last_name}"
    
    def add_course(self, course_id, grade="N/A", semester="Current"):
        """Add a course to the student's record."""
        self.courses[course_id] = {
            "grade": grade,
            "semester": semester,
            "date_added": None
        }
    
    def remove_course(self, course_id):
        """Remove a course from the student's record."""
        if course_id in self.courses:
            del self.courses[course_id]
            return True
        return False
    
    def update_grade(self, course_id, grade):
        """Update the grade for a specific course."""
        if course_id in self.courses:
            self.courses[course_id]["grade"] = grade
            return True
        return False
    
    def get_grade(self, course_id):
        """Get the grade for a specific course."""
        if course_id in self.courses:
            return self.courses[course_id]["grade"]
        return None
    
    def get_courses(self):
        """Return all courses for this student."""
        return self.courses
    
    def calculate_gpa(self):
        """Calculate the student's GPA based on current grades."""
        if not self.courses:
            return 0.0
        
        total_points = 0
        total_credits = 0
        
        # We'll need course credit information for accurate GPA
        # For now, assume each course is worth 3 credits
        for course_id, grade_info in self.courses.items():
            grade = grade_info["grade"]
            if grade != "N/A" and grade != "IP":  # IP = In Progress
                points = self.grade_to_points(grade)
                credits = 3  # Default credits per course
                total_points += points * credits
                total_credits += credits
        
        if total_credits == 0:
            return 0.0
        
        return total_points / total_credits
    
    @staticmethod
    def grade_to_points(grade):
        """Convert letter grade to grade points."""
        grade_scale = {
            "A+": 4.0, "A": 4.0, "A-": 3.7,
            "B+": 3.3, "B": 3.0, "B-": 2.7,
            "C+": 2.3, "C": 2.0, "C-": 1.7,
            "D+": 1.3, "D": 1.0, "D-": 0.7,
            "F": 0.0
        }
        return grade_scale.get(grade.upper(), 0.0)
    
    def get_academic_standing(self):
        """Determine academic standing based on GPA."""
        gpa = self.calculate_gpa()
        
        if gpa >= 3.5:
            return "Dean's List"
        elif gpa >= 3.0:
            return "Good Standing"
        elif gpa >= 2.5:
            return "Satisfactory"
        elif gpa >= 2.0:
            return "Probation"
        else:
            return "Academic Warning"
    
    def get_completed_credits(self):
        """Calculate total completed credits (courses with grades)."""
        completed = 0
        for course_id, grade_info in self.courses.items():
            if grade_info["grade"] not in ["N/A", "IP", "W"]:  # W = Withdrawn
                completed += 3  # Default 3 credits per course
        return completed
    
    def get_course_count(self):
        """Get the number of courses the student is/was enrolled in."""
        return len(self.courses)
    
    def to_dict(self):
        """Convert student object to dictionary for JSON serialization."""
        return {
            "student_id": self.student_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "year": self.year,
            "major": self.major,
            "courses": self.courses,
            "date_enrolled": self.date_enrolled
        }
    
    @classmethod
    def from_dict(cls, data):
        """Create a Student object from dictionary data."""
        student = cls(
            data["student_id"],
            data["first_name"],
            data["last_name"],
            data["email"],
            data["year"],
            data["major"]
        )
        student.courses = data.get("courses", {})
        student.date_enrolled = data.get("date_enrolled")
        return student
    
    def generate_transcript(self):
        """Generate a formatted transcript for the student."""
        transcript = []
        transcript.append(f"OFFICIAL TRANSCRIPT")
        transcript.append(f"=" * 50)
        transcript.append(f"Student: {self.get_full_name()}")
        transcript.append(f"ID: {self.student_id}")
        transcript.append(f"Major: {self.major}")
        transcript.append(f"Year: {self.year}")
        transcript.append(f"")
        transcript.append(f"ACADEMIC RECORD:")
        transcript.append(f"{'-' * 50}")
        
        if self.courses:
            transcript.append(f"{'Course':<12} {'Grade':<6} {'Credits':<8} {'Points':<8}")
            transcript.append(f"{'-' * 35}")
            
            for course_id, grade_info in self.courses.items():
                grade = grade_info["grade"]
                credits = 3  # Default
                points = self.grade_to_points(grade) * credits
                transcript.append(f"{course_id:<12} {grade:<6} {credits:<8} {points:<8.1f}")
            
            transcript.append(f"")
            transcript.append(f"SUMMARY:")
            transcript.append(f"Total Credits: {self.get_completed_credits()}")
            transcript.append(f"Cumulative GPA: {self.calculate_gpa():.2f}")
            transcript.append(f"Academic Standing: {self.get_academic_standing()}")
        else:
            transcript.append("No courses on record.")
        
        return "\\n".join(transcript)
    
    def __str__(self):
        """String representation of the student."""
        return f"Student({self.student_id}: {self.get_full_name()}, {self.major})"
    
    def __repr__(self):
        """Official string representation of the student."""
        return f"Student('{self.student_id}', '{self.first_name}', '{self.last_name}')"
`,
        type: 'file'
      },
      {
        id: '3',
        name: 'course.py',
        content: `# Course Class - Represents academic courses and their information

class Course:
    """Class to represent an academic course."""
    
    def __init__(self, course_id, course_name, credits, department, instructor="TBA", semester="Current"):
        """Initialize a new course."""
        self.course_id = course_id
        self.course_name = course_name
        self.credits = credits
        self.department = department
        self.instructor = instructor
        self.semester = semester
        self.enrolled_students = []  # List of student IDs
        self.prerequisites = []
        self.description = ""
        self.max_enrollment = 30
    
    def add_student(self, student_id):
        """Add a student to the course enrollment."""
        if student_id not in self.enrolled_students:
            if len(self.enrolled_students) < self.max_enrollment:
                self.enrolled_students.append(student_id)
                return True
            else:
                print(f"❌ Course {self.course_id} is at maximum enrollment ({self.max_enrollment})")
                return False
        else:
            print(f"❌ Student {student_id} is already enrolled in {self.course_id}")
            return False
    
    def remove_student(self, student_id):
        """Remove a student from the course enrollment."""
        if student_id in self.enrolled_students:
            self.enrolled_students.remove(student_id)
            return True
        return False
    
    def get_enrollment_count(self):
        """Get the number of enrolled students."""
        return len(self.enrolled_students)
    
    def get_available_spots(self):
        """Get the number of available enrollment spots."""
        return self.max_enrollment - len(self.enrolled_students)
    
    def is_full(self):
        """Check if the course is at maximum enrollment."""
        return len(self.enrolled_students) >= self.max_enrollment
    
    def add_prerequisite(self, course_id):
        """Add a prerequisite course."""
        if course_id not in self.prerequisites:
            self.prerequisites.append(course_id)
    
    def remove_prerequisite(self, course_id):
        """Remove a prerequisite course."""
        if course_id in self.prerequisites:
            self.prerequisites.remove(course_id)
    
    def get_prerequisites(self):
        """Get list of prerequisite courses."""
        return self.prerequisites.copy()
    
    def set_description(self, description):
        """Set the course description."""
        self.description = description
    
    def set_instructor(self, instructor):
        """Set the course instructor."""
        self.instructor = instructor
    
    def set_max_enrollment(self, max_enrollment):
        """Set the maximum enrollment for the course."""
        if max_enrollment > 0:
            self.max_enrollment = max_enrollment
    
    def get_course_info(self):
        """Get formatted course information."""
        info = []
        info.append(f"Course: {self.course_id} - {self.course_name}")
        info.append(f"Department: {self.department}")
        info.append(f"Credits: {self.credits}")
        info.append(f"Instructor: {self.instructor}")
        info.append(f"Semester: {self.semester}")
        info.append(f"Enrollment: {self.get_enrollment_count()}/{self.max_enrollment}")
        
        if self.prerequisites:
            info.append(f"Prerequisites: {', '.join(self.prerequisites)}")
        
        if self.description:
            info.append(f"Description: {self.description}")
        
        return "\\n".join(info)
    
    def generate_roster(self):
        """Generate a class roster with enrolled students."""
        roster = []
        roster.append(f"CLASS ROSTER")
        roster.append(f"=" * 40)
        roster.append(f"Course: {self.course_id} - {self.course_name}")
        roster.append(f"Instructor: {self.instructor}")
        roster.append(f"Semester: {self.semester}")
        roster.append(f"Enrolled: {self.get_enrollment_count()}/{self.max_enrollment}")
        roster.append(f"")
        roster.append(f"STUDENT LIST:")
        roster.append(f"{'-' * 40}")
        
        if self.enrolled_students:
            for i, student_id in enumerate(self.enrolled_students, 1):
                roster.append(f"{i:2d}. {student_id}")
        else:
            roster.append("No students enrolled.")
        
        return "\\n".join(roster)
    
    def to_dict(self):
        """Convert course object to dictionary for JSON serialization."""
        return {
            "course_id": self.course_id,
            "course_name": self.course_name,
            "credits": self.credits,
            "department": self.department,
            "instructor": self.instructor,
            "semester": self.semester,
            "enrolled_students": self.enrolled_students,
            "prerequisites": self.prerequisites,
            "description": self.description,
            "max_enrollment": self.max_enrollment
        }
    
    @classmethod
    def from_dict(cls, data):
        """Create a Course object from dictionary data."""
        course = cls(
            data["course_id"],
            data["course_name"],
            data["credits"],
            data["department"],
            data.get("instructor", "TBA"),
            data.get("semester", "Current")
        )
        course.enrolled_students = data.get("enrolled_students", [])
        course.prerequisites = data.get("prerequisites", [])
        course.description = data.get("description", "")
        course.max_enrollment = data.get("max_enrollment", 30)
        return course
    
    def __str__(self):
        """String representation of the course."""
        return f"Course({self.course_id}: {self.course_name}, {self.credits} credits)"
    
    def __repr__(self):
        """Official string representation of the course."""
        return f"Course('{self.course_id}', '{self.course_name}', {self.credits})"

# Sample course data for demonstration
SAMPLE_COURSES = [
    {
        "course_id": "CS101",
        "course_name": "Introduction to Computer Science",
        "credits": 3,
        "department": "Computer Science",
        "instructor": "Dr. Smith",
        "description": "Fundamental concepts of computer science and programming."
    },
    {
        "course_id": "MATH201",
        "course_name": "Calculus I",
        "credits": 4,
        "department": "Mathematics",
        "instructor": "Prof. Johnson",
        "description": "Limits, derivatives, and applications of differential calculus."
    },
    {
        "course_id": "ENG101",
        "course_name": "English Composition",
        "credits": 3,
        "department": "English",
        "instructor": "Dr. Williams",
        "description": "Academic writing and critical thinking skills."
    },
    {
        "course_id": "HIST101",
        "course_name": "World History",
        "credits": 3,
        "department": "History",
        "instructor": "Prof. Brown",
        "description": "Survey of world civilizations from ancient to modern times."
    },
    {
        "course_id": "BIO101",
        "course_name": "General Biology",
        "credits": 4,
        "department": "Biology",
        "instructor": "Dr. Davis",
        "description": "Introduction to biological principles and laboratory techniques."
    }
]

def create_sample_courses():
    """Create sample course objects for demonstration."""
    courses = []
    for course_data in SAMPLE_COURSES:
        course = Course(
            course_data["course_id"],
            course_data["course_name"],
            course_data["credits"],
            course_data["department"],
            course_data["instructor"]
        )
        course.set_description(course_data["description"])
        courses.append(course)
    return courses
`,
        type: 'file'
      },
      {
        id: '4',
        name: 'grade_manager.py',
        content: `# Grade Manager - Main class for managing students, courses, and grades

import json
import os
from datetime import datetime
from student import Student
from course import Course, create_sample_courses

class GradeManager:
    """Main class for managing the grade management system."""
    
    def __init__(self):
        """Initialize the grade manager."""
        self.students = {}  # Dictionary: student_id -> Student object
        self.courses = {}   # Dictionary: course_id -> Course object
        self.data_file = "grade_data.json"
        self.backup_file = "grade_data_backup.json"
    
    # Student Management Methods
    def add_student(self, student):
        """Add a student to the system."""
        self.students[student.student_id] = student
        return True
    
    def get_student(self, student_id):
        """Get a student by ID."""
        return self.students.get(student_id)
    
    def remove_student(self, student_id):
        """Remove a student from the system."""
        if student_id in self.students:
            student = self.students[student_id]
            
            # Remove student from all courses
            for course_id in list(student.courses.keys()):
                self.unenroll_student(student_id, course_id)
            
            del self.students[student_id]
            return True
        return False
    
    def get_all_students(self):
        """Get all students sorted by last name."""
        return sorted(self.students.values(), key=lambda s: s.last_name)
    
    def update_student_info(self, student_id, **kwargs):
        """Update student information."""
        student = self.get_student(student_id)
        if not student:
            return False
        
        for key, value in kwargs.items():
            if hasattr(student, key):
                setattr(student, key, value)
        
        return True
    
    # Course Management Methods
    def add_course(self, course):
        """Add a course to the system."""
        self.courses[course.course_id] = course
        return True
    
    def get_course(self, course_id):
        """Get a course by ID."""
        return self.courses.get(course_id)
    
    def remove_course(self, course_id):
        """Remove a course from the system."""
        if course_id in self.courses:
            course = self.courses[course_id]
            
            # Remove course from all students
            for student_id in course.enrolled_students:
                student = self.get_student(student_id)
                if student:
                    student.remove_course(course_id)
            
            del self.courses[course_id]
            return True
        return False
    
    def get_all_courses(self):
        """Get all courses sorted by course ID."""
        return sorted(self.courses.values(), key=lambda c: c.course_id)
    
    # Enrollment Management
    def enroll_student(self, student_id, course_id):
        """Enroll a student in a course."""
        student = self.get_student(student_id)
        course = self.get_course(course_id)
        
        if not student or not course:
            return False, "Student or course not found"
        
        if course_id in student.courses:
            return False, "Student already enrolled in this course"
        
        if course.is_full():
            return False, "Course is at maximum enrollment"
        
        # Add student to course and course to student
        course.add_student(student_id)
        student.add_course(course_id)
        
        return True, "Enrollment successful"
    
    def unenroll_student(self, student_id, course_id):
        """Unenroll a student from a course."""
        student = self.get_student(student_id)
        course = self.get_course(course_id)
        
        if not student or not course:
            return False
        
        # Remove student from course and course from student
        course.remove_student(student_id)
        student.remove_course(course_id)
        
        return True
    
    # Grade Management
    def assign_grade(self, student_id, course_id, grade):
        """Assign a grade to a student for a course."""
        student = self.get_student(student_id)
        course = self.get_course(course_id)
        
        if not student or not course:
            return False, "Student or course not found"
        
        if course_id not in student.courses:
            return False, "Student not enrolled in this course"
        
        # Validate grade
        valid_grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", 
                       "D+", "D", "D-", "F", "IP", "W"]
        if grade.upper() not in valid_grades:
            return False, "Invalid grade format"
        
        student.update_grade(course_id, grade.upper())
        return True, "Grade assigned successfully"
    
    # Statistics and Reports
    def get_class_statistics(self, course_id):
        """Get statistics for a specific course."""
        course = self.get_course(course_id)
        if not course:
            return None
        
        grades = []
        grade_distribution = {}
        
        for student_id in course.enrolled_students:
            student = self.get_student(student_id)
            if student:
                grade = student.get_grade(course_id)
                if grade and grade not in ["N/A", "IP", "W"]:
                    grades.append(Student.grade_to_points(grade))
                    grade_distribution[grade] = grade_distribution.get(grade, 0) + 1
        
        if not grades:
            return {
                "course_id": course_id,
                "course_name": course.course_name,
                "enrolled_count": course.get_enrollment_count(),
                "graded_count": 0,
                "average_gpa": 0.0,
                "grade_distribution": {}
            }
        
        stats = {
            "course_id": course_id,
            "course_name": course.course_name,
            "enrolled_count": course.get_enrollment_count(),
            "graded_count": len(grades),
            "average_gpa": sum(grades) / len(grades),
            "highest_grade": max(grades),
            "lowest_grade": min(grades),
            "grade_distribution": grade_distribution
        }
        
        return stats
    
    def get_student_summary(self, student_id):
        """Get a summary of a student's academic performance."""
        student = self.get_student(student_id)
        if not student:
            return None
        
        summary = {
            "student_id": student_id,
            "name": student.get_full_name(),
            "major": student.major,
            "year": student.year,
            "gpa": student.calculate_gpa(),
            "total_courses": student.get_course_count(),
            "completed_credits": student.get_completed_credits(),
            "academic_standing": student.get_academic_standing(),
            "courses": []
        }
        
        for course_id, grade_info in student.courses.items():
            course = self.get_course(course_id)
            if course:
                course_summary = {
                    "course_id": course_id,
                    "course_name": course.course_name,
                    "credits": course.credits,
                    "grade": grade_info["grade"],
                    "semester": grade_info["semester"]
                }
                summary["courses"].append(course_summary)
        
        return summary
    
    def get_overall_statistics(self):
        """Get overall system statistics."""
        stats = {
            "total_students": len(self.students),
            "total_courses": len(self.courses),
            "total_enrollments": 0,
            "average_gpa": 0.0,
            "gpa_distribution": {
                "Dean's List (3.5+)": 0,
                "Good Standing (3.0-3.49)": 0,
                "Satisfactory (2.5-2.99)": 0,
                "Probation (2.0-2.49)": 0,
                "Warning (<2.0)": 0
            }
        }
        
        if not self.students:
            return stats
        
        total_gpa = 0
        students_with_gpa = 0
        
        for student in self.students.values():
            stats["total_enrollments"] += student.get_course_count()
            
            gpa = student.calculate_gpa()
            if gpa > 0:
                total_gpa += gpa
                students_with_gpa += 1
                
                if gpa >= 3.5:
                    stats["gpa_distribution"]["Dean's List (3.5+)"] += 1
                elif gpa >= 3.0:
                    stats["gpa_distribution"]["Good Standing (3.0-3.49)"] += 1
                elif gpa >= 2.5:
                    stats["gpa_distribution"]["Satisfactory (2.5-2.99)"] += 1
                elif gpa >= 2.0:
                    stats["gpa_distribution"]["Probation (2.0-2.49)"] += 1
                else:
                    stats["gpa_distribution"]["Warning (<2.0)"] += 1
        
        if students_with_gpa > 0:
            stats["average_gpa"] = total_gpa / students_with_gpa
        
        return stats
    
    # Search Methods
    def search_students(self, query):
        """Search for students by name, ID, or major."""
        query = query.lower()
        results = []
        
        for student in self.students.values():
            if (query in student.student_id.lower() or
                query in student.first_name.lower() or
                query in student.last_name.lower() or
                query in student.major.lower() or
                query in student.email.lower()):
                results.append(student)
        
        return results
    
    def search_courses(self, query):
        """Search for courses by ID, name, or department."""
        query = query.lower()
        results = []
        
        for course in self.courses.values():
            if (query in course.course_id.lower() or
                query in course.course_name.lower() or
                query in course.department.lower() or
                query in course.instructor.lower()):
                results.append(course)
        
        return results
    
    # Data Persistence
    def save_data(self):
        """Save all data to JSON file."""
        try:
            # Create backup of existing data
            if os.path.exists(self.data_file):
                import shutil
                shutil.copy2(self.data_file, self.backup_file)
            
            data = {
                "students": {sid: student.to_dict() for sid, student in self.students.items()},
                "courses": {cid: course.to_dict() for cid, course in self.courses.items()},
                "last_updated": datetime.now().isoformat()
            }
            
            with open(self.data_file, 'w') as f:
                json.dump(data, f, indent=2)
            
            return True
        except Exception as e:
            print(f"❌ Error saving data: {e}")
            return False
    
    def load_data(self):
        """Load data from JSON file."""
        try:
            if not os.path.exists(self.data_file):
                print("📄 No existing data file found. Starting with sample data.")
                self.create_sample_data()
                return True
            
            with open(self.data_file, 'r') as f:
                data = json.load(f)
            
            # Load students
            for sid, student_data in data.get("students", {}).items():
                student = Student.from_dict(student_data)
                self.students[sid] = student
            
            # Load courses
            for cid, course_data in data.get("courses", {}).items():
                course = Course.from_dict(course_data)
                self.courses[cid] = course
            
            print(f"✅ Loaded {len(self.students)} students and {len(self.courses)} courses")
            return True
            
        except Exception as e:
            print(f"❌ Error loading data: {e}")
            print("🔄 Starting with sample data instead.")
            self.create_sample_data()
            return False
    
    def create_sample_data(self):
        """Create sample data for demonstration."""
        # Create sample courses
        sample_courses = create_sample_courses()
        for course in sample_courses:
            self.add_course(course)
        
        # Create sample students
        sample_students = [
            Student("S001", "Alice", "Johnson", "alice.j@email.com", "Sophomore", "Computer Science"),
            Student("S002", "Bob", "Smith", "bob.smith@email.com", "Junior", "Mathematics"),
            Student("S003", "Carol", "Williams", "carol.w@email.com", "Freshman", "Biology"),
            Student("S004", "David", "Brown", "david.brown@email.com", "Senior", "History"),
            Student("S005", "Emma", "Davis", "emma.davis@email.com", "Sophomore", "English")
        ]
        
        for student in sample_students:
            self.add_student(student)
        
        # Create sample enrollments and grades
        enrollments = [
            ("S001", "CS101", "A-"),
            ("S001", "MATH201", "B+"),
            ("S002", "MATH201", "A"),
            ("S002", "CS101", "B"),
            ("S003", "BIO101", "A-"),
            ("S003", "ENG101", "B+"),
            ("S004", "HIST101", "A"),
            ("S004", "ENG101", "A-"),
            ("S005", "ENG101", "A"),
            ("S005", "HIST101", "B+")
        ]
        
        for student_id, course_id, grade in enrollments:
            self.enroll_student(student_id, course_id)
            self.assign_grade(student_id, course_id, grade)
        
        print("📚 Sample data created successfully!")
        print(f"   - {len(self.students)} sample students")
        print(f"   - {len(self.courses)} sample courses")
        print(f"   - {len(enrollments)} sample enrollments with grades")
`,
        type: 'file'
      }
    ]
  }
];

// Add Python projects to the existing projects data
export { PYTHON_PROJECTS };