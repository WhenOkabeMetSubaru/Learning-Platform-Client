"use client"
import React from 'react';
import sanitizeHtml from "sanitize-html";

function FilterHtml({ htmlContent }:any) {
    // Sanitize HTML content to remove any potentially harmful tags
    const sanitizedHtml = sanitizeHtml(htmlContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['br', 'hr', 'strong']), // Allow <br>, <hr>, <strong> tags
    });

    return (
        <div>
            {/* Render sanitized HTML content */}
            <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </div>
    );
}

export default FilterHtml;


export const FilterHtmlReturnData = ({htmlContent}:any)=>{

    const sanitizedHtml = sanitizeHtml(htmlContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['br', 'hr', 'strong']), // Allow <br>, <hr>, <strong> tags
    });

    return sanitizedHtml;
    
}