require 'rubygems'
require 'rack'

use Rack::Static,
  :urls => ["/images", "/js", "/css", "/fonts"],
  :root => "app"

run lambda {|env|

  if env["PATH_INFO"] == "/"
    path = "app/index.html"
  else
    path = "./#{env["PATH_INFO"]}"
  end

  p "Path without ./ is #{env["PATH_INFO"]}, File.file?(#{env["PATH_INFO"]})"
  p "Path is #{path}"

  unless File.file?(path)
    return [404, {"Content-Type" => "text/html"}, ["<html><body>NO!</body></html>"] ]
  end

  fileExt = File.extname(path)
  p "Extension is #{fileExt}"

  contentTypes = {
  	:css => "text/css",
  	:html => "text/html",
  	:js => "text/javascript",
	  :json => "application/json",
  	:png => "image/png",
  	:jpg => "image/jpeg",
  	:gif => "image/gif",
    :ttf => "application/x-font-ttf",
    :woff => "application/x-font-woff",
    :svg => "image/svg+xml"
  }

  contentType = contentTypes[fileExt[1..-1].to_sym]
  p "Content-Type is #{contentType}"

  [200, {"Content-Type" => contentType}, [File.read(path)] ]
}
