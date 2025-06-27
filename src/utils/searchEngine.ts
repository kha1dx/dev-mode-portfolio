import { FileItem } from '../pages/Index';
import { getFileContent } from './fileContent';

export interface SearchResult {
  fileId: string;
  fileName: string;
  content: string;
  matches: number;
  snippets: string[];
}

export class SearchEngine {
  private files: FileItem[];

  constructor(files: FileItem[]) {
    this.files = files;
  }

  private getAllFiles(files: FileItem[]): FileItem[] {
    const result: FileItem[] = [];
    
    files.forEach(file => {
      if (file.type === 'file') {
        result.push(file);
      }
      if (file.children) {
        result.push(...this.getAllFiles(file.children));
      }
    });
    
    return result;
  }

  private createSnippet(content: string, searchTerm: string, contextLength = 50): string[] {
    const lines = content.split('\n');
    const snippets: string[] = [];
    const searchLower = searchTerm.toLowerCase();

    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(searchLower)) {
        const start = Math.max(0, line.toLowerCase().indexOf(searchLower) - contextLength);
        const end = Math.min(line.length, line.toLowerCase().indexOf(searchLower) + searchTerm.length + contextLength);
        let snippet = line.substring(start, end);
        
        if (start > 0) snippet = '...' + snippet;
        if (end < line.length) snippet = snippet + '...';
        
        // Highlight the search term
        const highlightedSnippet = snippet.replace(
          new RegExp(searchTerm, 'gi'),
          `**${searchTerm}**`
        );
        
        snippets.push(`Line ${index + 1}: ${highlightedSnippet}`);
      }
    });

    return snippets.slice(0, 3); // Limit to 3 snippets per file
  }

  search(searchTerm: string): SearchResult[] {
    const allFiles = this.getAllFiles(this.files);
    const results: SearchResult[] = [];

    allFiles.forEach(file => {
      const content = getFileContent(file.content || '');
      
      const matches = (content.match(new RegExp(searchTerm, 'gi')) || []).length;
      
      if (matches > 0) {
        const snippets = this.createSnippet(content, searchTerm);
        
        results.push({
          fileId: file.id,
          fileName: file.name,
          content: content,
          matches: matches,
          snippets: snippets
        });
      }
    });

    // Sort by number of matches (descending)
    return results.sort((a, b) => b.matches - a.matches);
  }
}
  

