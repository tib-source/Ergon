package com.tibs.Ergon;

import java.util.List;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class SpringConfiguration implements WebMvcConfigurer{
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){ 
        this.serveDirectory(registry, "/", "classpath:/static/");
    }
    

    private void serveDirectory(ResourceHandlerRegistry registry, String endpoint, String location){ 
        String[] endpointPatterns = endpoint.endsWith("/") 
        ? new String[]{endpoint.substring(0, endpoint.length()-1), endpoint, endpoint+ "**"} 
        : new String[]{ endpoint, endpoint + "/", endpoint + "/**"}; 

        registry
            .addResourceHandler(endpointPatterns)
            .addResourceLocations(location.endsWith("/") ? location : location+ "/")
            .resourceChain(false)
            .addResolver(new PathResourceResolver() {
                @Override
                public Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain){ 
                    Resource resource = super.resolveResource(request, location, locations, chain);
                    if(nonNull(resource)){
                        return resource; 
                    }

                    return super.resolveResource(request, "/index.html", locations, chain); 
                }
            });

    }
}
