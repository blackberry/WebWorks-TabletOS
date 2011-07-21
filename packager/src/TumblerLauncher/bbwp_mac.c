/*
* Copyright 2010-2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
#include <stdio.h>
#include <unistd.h>
#include <limits.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>

#include <libxml/parser.h>
#include <libxml/tree.h>
#include <libxml/xpath.h>

const char* JAVA = "java";
const char* BIN_BBWP_JAR = "/bin/bbwp.jar";
const char* BBWP = "bbwp";

xmlChar* get_java_home(char *current_path)
{
	char path_to_bbwp_properties[PATH_MAX+1];
	
	strncpy(path_to_bbwp_properties, current_path, PATH_MAX+1);
	strncat(path_to_bbwp_properties, "/bin/bbwp.properties", PATH_MAX+1);
	
	xmlDocPtr doc = xmlParseFile(path_to_bbwp_properties);
	if (doc == NULL) {
		printf("error: could not parse file %s\n", path_to_bbwp_properties);
	}
	
	xmlXPathContextPtr context = xmlXPathNewContext(doc);
	xmlChar * xpath = "/wcp/java";
	xmlNodeSetPtr nodeset;
	xmlXPathObjectPtr result = xmlXPathEvalExpression(xpath, context);
	xmlChar *java_home;
	
	if(xmlXPathNodeSetIsEmpty(result->nodesetval)){
		printf("No result\n");
	} else {
        nodeset = result->nodesetval;
        java_home = xmlNodeListGetString(doc, nodeset->nodeTab[0]->xmlChildrenNode, 1);
	}
	
	xmlFreeDoc(doc);
	xmlXPathFreeContext(context);
	xmlXPathFreeObject(result);
	
	/*
	 * Free the global variables that may
	 * have been allocated by the parser.
	 */
	xmlCleanupParser();
	
	return java_home;
}

char *getBBWPjarPath()
{
	const char *path;
	struct stat buf;
	int status=0;
	if (!(path = getenv("PATH"))) return NULL;
	int len = strlen(path);
	char *wpath = malloc(len+1);
	
	strcpy(wpath,path);
	char *curpath = strtok(wpath,":");
	while (curpath!=NULL)
	{
		int plen = strlen(curpath);
		char *bbwptpath = malloc(plen + 8);
		strcpy(bbwptpath,curpath);
		strcat(bbwptpath,"/");
		strcat(bbwptpath,BBWP);
		status = stat(bbwptpath, &buf);
		if (status == 0 && buf.st_mode & S_IFREG == S_IFREG ) 
		{
			char *returnpath = malloc(plen+1);
			strcpy(returnpath,curpath);
			free(wpath);
			free(bbwptpath);
			return returnpath;
		}
		free(bbwptpath);
		curpath = strtok(NULL,":");
	}
	free(wpath);
	return 0;
}

int main(int argc, char **argv)
{
	int i;
	char cwd[PATH_MAX+1];
	
	if (getcwd(cwd, PATH_MAX+1) == NULL) {
		perror("getcwd failed");
	} else {
		
        char java_exe[PATH_MAX+1];
        char bbwp_path[PATH_MAX+1];
        char bbwp_jar[PATH_MAX+1];
        char new_cwd[PATH_MAX+1];
		int len = strlen(argv[0]);
		int i = len-1;
		while (i>0 && argv[0][i]!='/') i--;
		argv[0][i+1]=0;
		if (argv[0][0] == '/')
		{
			bbwp_jar[0]=0;
		}
		else 
		{
			strncpy(bbwp_jar, cwd,PATH_MAX+1);
			strncat(bbwp_jar, "/",PATH_MAX+1);
		}
		strncat(bbwp_jar, argv[0], PATH_MAX+1);
		strncpy(new_cwd, bbwp_jar, PATH_MAX+1);
		strncat(bbwp_jar, BBWP, PATH_MAX+1);

		struct stat buf;
		int status=0;
		status = stat(bbwp_jar, &buf);
		if (status == 0 && buf.st_mode & S_IFREG == S_IFREG ) 
		{
			strncpy(bbwp_jar, new_cwd, PATH_MAX+1);
			strncpy(bbwp_path, new_cwd, PATH_MAX+1);
			strncat(bbwp_jar, BIN_BBWP_JAR, PATH_MAX+1);			
		}
		else {
			char *tmp = getBBWPjarPath();
			if (tmp == NULL) 
			{
				printf("cannot locate bbwp in path\n");
				return -1;
			}
			strncpy(bbwp_jar,tmp, PATH_MAX+1);
			strncpy(bbwp_path,tmp, PATH_MAX+1);
			free(tmp);
			strncat(bbwp_jar, BIN_BBWP_JAR, PATH_MAX+1);			
		}
        xmlChar * java_home = get_java_home(bbwp_path);
		
        if (java_home){
			strncpy(java_exe, java_home, PATH_MAX+1);
			strncat(java_exe, "/bin/java", PATH_MAX+1);
			
        } else {
			strncpy(java_exe, JAVA, PATH_MAX+1);
        }
        strncpy(java_exe, JAVA, PATH_MAX+1);
		
        char *new_args[argc+3];
		
        new_args[0] = java_exe;
        new_args[1] = "-jar";
        new_args[2] = bbwp_jar;
        for(i = 1; i < argc; i++) {
			new_args[2+i] = argv[i];
        }
        new_args[argc+2] = NULL;
		
        if (execvp(new_args[0], new_args) < 0) {
			printf("execvp failed %s \n",new_args[0]);
        }
	}
	
	return 0;
}
